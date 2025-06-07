import { getComedyMovies, searchMovie, castMovie } from "../src/services/Service";

test('trae un objeto con las películas de comedia del momento', async () => {
  const data = await getComedyMovies();
  expect(typeof data).toBe('object'); 
});

test('buscar pelicula', async () => {
  const data = await searchMovie("533535");
  expect(typeof data).toBe('object'); 
});


test('buscar cast', async () => {
  const data = await castMovie("533535");
  expect(typeof data).toBe('object'); 
});