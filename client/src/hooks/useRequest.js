import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (requestFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiRequest = async () => {
      try {
        const requestResult = await requestFunc();
        setData(requestResult);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
  };

  useEffect(() => {
    apiRequest();
  }, [data]);

  return [data, loading, error];
};

export default useRequest;
