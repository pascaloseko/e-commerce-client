import { useEffect, useState } from 'react';

interface Params {
  [key: string]: string;
}

function useParams(): { params: Params; updateParams: (newParams: Params) => void } {
  const [params, setParams] = useState<Params>({});

  useEffect(() => {
    // Functionality to parse cart data from URL query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const data: Params = {};
    for (const [key, value] of searchParams.entries()) {
      data[key] = value;
    }
    setParams(data);
  }, []);

  // Function to update cart data in URL query parameters
  const updateParams = (newParams: Params): void => {
    const params = new URLSearchParams();
    for (const key in newParams) {
      params.set(key, newParams[key]);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    setParams(newParams);
  };

  return { params, updateParams };
}

export default useParams;
