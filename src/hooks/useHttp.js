import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  // sendRequest now expects a JS object, not a string
  const sendRequest = useCallback(
    async function sendRequest(requestData) { // Renamed parameter to requestData for clarity
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: JSON.stringify(requestData) // <-- Stringify the data here!
        });
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    // This part for GET requests probably needs to be adjusted if sendRequest now takes an argument
    // If your config already specifies 'GET' or no method (defaulting to GET), and you're not sending a body for GET,
    // this might be okay. If you need to send query params, that's handled differently.
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest(); // Call without data for GET
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData
  };
}