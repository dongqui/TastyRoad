import { useState, useEffect } from 'react';
import axios from 'axios';

const useRequest = (url) => {
    const [data, setData] = useState(null);
    const [lodaing, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiRequest = async () => {
        try {
            const requestResult = await axios.get(url);
            useData(requestResult);
            useLoding(false);
        } catch (e) {
            useError(e);
            useLoding(false);
        }
    };

    return [data, loading, error];
};

export default useRequest;
