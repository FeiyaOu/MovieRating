import { useState, useEffect } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "730cead4";

  useEffect(
    function () {
      const controller = new AbortController();
      async function movieFetching() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("!!Failed to fetch movies.");
          const data = await res.json();
          if (data.Response === "False") throw new Error("!!No movies Found.");
          setMovies(data.Search);
          setError("");
          console.log(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message || "there is an error");
            console.error(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 2) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      movieFetching();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
