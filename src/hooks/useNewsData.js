
import { useState, useEffect } from "react";
import axios from 'axios';

const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before each request

      try {
        const searchParam = category || searchTerm || "all";
        const uri = searchParam ? `${process.env.REACT_APP_API_URI}/get-category` : `${process.env.REACT_APP_API_URI}/get-news`;
        const body = searchParam ? { data: searchParam } : undefined;

        const response = await axios.post(uri, body);
        setNewsData(response.data.articles);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, searchTerm]);

  return { newsData, loading, error };
};

export default useNewsData;
