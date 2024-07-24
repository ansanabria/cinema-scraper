import { createClient } from '@supabase/supabase-js';
import { writeFile } from 'fs';
import puppeteer, { Browser } from 'puppeteer';
import cinemasInitialData, { CinemaInitialData } from './data.js';
import { Cinema } from './types.js';
import { Database } from './supabase.js';
import { parseSpanishDate } from './helper.js';

const supabase = createClient<Database>(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

async function fetchMovieTitle(title: string) {
  const { data, error } = await supabase
    .from('movies')
    .select()
    .eq('name', title);
  if (error) throw error;
  return data.at(0);
}

async function scrapeCinema(
  cinemaInitialData: CinemaInitialData,
  browser: Browser,
): Promise<Cinema> {
  const page = await browser.newPage();
  await page.goto(cinemaInitialData.url.toString());
  await page.waitForSelector(cinemaInitialData.parentSelector);

  const rawMovies = await page.evaluate((cinemaInitialData) => {
    return Array.from(
      document.querySelectorAll(cinemaInitialData.parentSelector),
      (element) => {
        const title = (element.querySelector('h2') as HTMLElement).innerText;
        const premiere = (
          Array.from(element.querySelectorAll('.movie-item__meta')).at(
            -2,
          ) as HTMLElement
        ).innerText
          .split(' ')
          .at(-1);
        const type = (
          (element.querySelector('.movie-item__badge') as HTMLElement)
            ?.innerText ?? 'normal'
        ).toLowerCase();
        const href = element.getAttribute('href');
        return { title, premiere, type, href };
      },
    );
  }, cinemaInitialData);

  await page.close();

  const movies = rawMovies.map((mov) => {
    const premiere = parseSpanishDate(mov.premiere).toISOString();
    const href = new URL(mov.href, cinemaInitialData.url).toString();
    return { ...mov, premiere, href };
  });

  return { cinema: cinemaInitialData.cinema, movies };
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });

  const cinemas = await Promise.all(
    cinemasInitialData.map(
      async (cinemaInitialData) =>
        await scrapeCinema(cinemaInitialData, browser),
    ),
  );

  await browser.close();

  writeFile('src/data.json', JSON.stringify(cinemas), (err) => err);

  cinemas.forEach(async (cin) => {
    cin.movies.forEach(async ({ title, href, type, premiere }) => {
      // Add title to the 'movies' db
      let movTitle = await fetchMovieTitle(title);
      if (movTitle === undefined) {
        await supabase.from('movies').insert({ name: title });
      }

      // Add title to the cinema
      movTitle = await fetchMovieTitle(title);
      const { data: cinemaData, error: cinemaError } = await supabase
        .from('cinemas')
        .select()
        .eq('cinema', cin.cinema)
        .eq('movie_id', movTitle.id);
      if (cinemaError) throw cinemaError;
      if (cinemaData.length === 0) {
        await supabase.from('cinemas').insert({
          cinema: cin.cinema,
          href,
          type,
          premiere,
          movie_id: movTitle.id,
        });
      }
    });
  });
}

main();
