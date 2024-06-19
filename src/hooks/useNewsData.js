import { useState, useEffect } from "react";

const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);

        const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
        const searchParam = category ? `q=${category}` : searchTerm ? `q=${searchTerm}` : "q=all";
        var url = 'https://newsapi.org/v2/everything?' + `${searchParam}&` + `apiKey=${apiKey}`;

        // const url = `https://newsapi.org/v2/everything?country=IN&category=business&apiKey=${apiKey}`;
        // const url = apiUrl + categoryParam + searchParam;
        const response = await fetch(url);
        const data = await response.json();
        setNewsData(data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchNewsData();
  }, [category, searchTerm]);

  return { newsData, loading, error };
};

export default useNewsData;
