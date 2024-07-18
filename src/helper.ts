export function scrapeMovieData() {
  // Helper functions
  const queryInnerText = (className: string) =>
    (document.querySelector(className) as HTMLElement).innerText;

  // Scraping

  const title = queryInnerText('.movie-details__block:nth-child(2) p');

  const premiere = (
    Array.from(document.querySelectorAll('.movie-banner-main__info p')).at(
      -2,
    ) as HTMLElement
  ).innerText
    .split(' ')
    .at(-1)
    .toLowerCase();

  const presale =
    (Array.from(document.querySelectorAll('.tags .tag')).at(-1) as HTMLElement)
      .innerText === 'Preventa';

  const dateCol = document.querySelector('.glide__slide--active > div');
  const month = (dateCol.querySelector('.date-filter__month') as HTMLElement)
    .innerText;
  const day = (dateCol.querySelector('.date-filter__item-date') as HTMLElement)
    .innerText;
  const date = `${day}-${month}`;

  const schedule = Array.from(
    document.querySelectorAll('.show-times .collapse'),
    (element) => {
      const theater = (element.querySelector('h3') as HTMLElement).innerText;
      const showTime = Array.from(
        element.querySelectorAll('.show-times-group'),
        (showTimesGroup) => {
          const [dim, lang] = Array.from(
            showTimesGroup.querySelectorAll('.show-times-group__attrs span'),
            (span) => (span as HTMLElement).innerText,
          );
          const roomType =
            showTimesGroup
              .querySelector('.show-times-group__attrs img')
              ?.getAttribute('alt') ?? 'Normal';
          const availableTimes = Array.from(
            showTimesGroup.querySelectorAll('.show-times-group__times a span'),
            (span) => (span as HTMLElement).innerText,
          );
          return availableTimes.map((time) => ({ dim, lang, time, roomType }));
        },
      );
      return { theater, date, showTime };
    },
  );
  return { title, premiere, presale, schedule };
}
