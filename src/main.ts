import { writeFile } from 'fs';
import puppeteer, { Browser } from 'puppeteer';
import cinemas, { Cinema } from './data.js';
import { scrapeMovieData } from './helper.js';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient<Database>(
//   process.env.SUPABASE_PROJECT_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY,
// );

async function scrapeCinema(cinema: Cinema, browser: Browser) {
  const page = await browser.newPage();
  await page.goto(cinema.url.toString());
  await page.waitForSelector(cinema.parentSelector);

  const moviesUrls = await page.evaluate((cinema) => {
    return Array.from(
      document.querySelectorAll(cinema.parentSelector),
      (element) => {
        const href = element.getAttribute('href');
        return new URL(href, cinema.url).toString();
      },
    );
  }, cinema);

  await page.close();

  const movies = (
    await Promise.all(
      moviesUrls.map(async (movieUrl) => {
        const page = await browser.newPage();
        await page.goto(movieUrl);
        await page.waitForNetworkIdle();
        try {
          await page.waitForSelector('.show-times .collapse', {
            timeout: 1500,
          });
        } catch (err) {
          return null;
        }

        // Injected functions and libraries
        await page.evaluate(`${scrapeMovieData.toString()}`);
        const movieData = await page.evaluate(() => {
          return scrapeMovieData();
        });
        await page.close();
        return movieData;
      }),
    )
  ).filter((movie) => movie !== null);

  return { cinema: cinema.cinema, movies };
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });

  const movies = await Promise.all(
    cinemas.map(async (cinema) => await scrapeCinema(cinema, browser)),
  );

  await browser.close();

  writeFile('src/data.json', JSON.stringify(movies), (err) => err);
}

main();
