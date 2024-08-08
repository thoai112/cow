import { useEffect, useState } from 'react';
import dataJson from '../assets/data/currencies.json';

const useCurrencyFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const mData = Object.entries(dataJson).map(([code, details]) => ({
    code,
    ...details,
  }));

  async function fetchCurrencyData(code) {
    const url = `/api/get-quotes`;
    const payload = {
        inCurrency: code,
        outCurrency: "VND"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const price = responseData.data.defaultPair.price;
        const timestamp = new Date(responseData.data.timestamp).toLocaleString();

        // Update datacurrency with price and timestamp
        mData = mData.map(item => 
            item.code === code ? { ...item, priceVND: price, timeUpdate: timestamp } : item
        );

    } catch (error) {
        console.error(`Error fetching currency data for ${code}:`, error);
    }
}

  async function updateCurrencyData() {
    try {
      setLoading(true);
      const updatedData = await Promise.all(mData.map(({ code }) => fetchCurrencyData(code)));
      console.log("Updated Data:", updatedData); // Log the updated data
      setData(updatedData);
      setLoading(false);
    } catch (error) {
      console.error("Error updating currency data:", error);
      setError(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    updateCurrencyData();
  },[]);

  return {
    data,
    error,
    loading,
  };
};

export default useCurrencyFetch;