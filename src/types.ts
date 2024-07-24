export interface Movie {
  title: string;
  premiere: string;
  type: string;
  href: string;
}

export interface Cinema {
  cinema: string;
  movies: Movie[];
}
