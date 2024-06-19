import { useState, useEffect } from "react";
import axios from 'axios';

const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);

        const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
        const searchParam = category ? category : searchTerm ? searchTerm : "all";
        // var url = 'https://newsapi.org/v2/everything?' + `${searchParam}&` + `apiKey=${apiKey}`;
        // const url = `https://newsapi.org/v2/everything?country=IN&category=business&apiKey=${apiKey}`;
        // const url = apiUrl + categoryParam + searchParam;
        // const response = await fetch(url);
        // const data = await response.json();
        // setNewsData(data.articles);
        if (searchParam) {
          var url = `https://news-api-cs3h.onrender.com/get-category`;
          const response = (await axios.post(url, { data: searchParam})).data
          setNewsData(response.articles);
        } else {
          var url = `https://news-api-cs3h.onrender.com/get-news`;
          const response = (await axios.get(url)).data
          setNewsData(response.articles);
        }


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
