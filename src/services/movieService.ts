import axios from 'axios';
import type { Movie } from '../types/movie';

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

type FetchMoviesParams = {
  query: string;
  page: number;
};

export async function fetchMovies(params: FetchMoviesParams): Promise<MovieSearchResponse> {
  const { query, page } = params;

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;

  const response = await axios.get<MovieSearchResponse>(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  return response.data;
}