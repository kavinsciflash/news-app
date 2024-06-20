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

        const searchParam = category ? category : searchTerm ? searchTerm : "all";

        let uri, body;

        if (searchParam) {
          uri = 'http://localhost:5000/get-category';
          body = { data: searchParam };
        } else {
          uri = 'http://localhost:5000/get-news';
        }

        const response = await axios.post(uri, body);
        setNewsData(response.data.articles);
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
