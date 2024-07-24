export interface CinemaInitialData {
  cinema: string;
  url: URL;
  parentSelector: string;
}

const cinemasInitialData: CinemaInitialData[] = [
  {
    cinema: 'Cine Colombia',
    url: new URL('https://www.cinecolombia.com/bogota/cartelera'),
    parentSelector: '.movie-item',
  },
  // {
  //   cinema: 'Cinépolis',
  //   url: 'https://cinepolis.com.co/cartelera/bogota-colombia/',
  //   parentSelector: 'article.tituloPelicula',
  //   titleSelector: 'h3 a',
  // },
  // {
  //   cinema: 'Cinemark',
  //   url: 'https://www.cinemark.com.co/cartelera/bogota',
  //   parentSelector: '.billboard-movies grid-movie__card',
  //   titleSelector: '.info-movie__title-movie',
  // },
  // {
  //   cinema: 'Procinal',
  //   url: 'https://www.procinal.com.co/ciudad/bogota',
  //   parentSelector: '.MovieList_content .MovieBox',
  //   titleSelector: 'h3',
  // },
];

export default cinemasInitialData;
