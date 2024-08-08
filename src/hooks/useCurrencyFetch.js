import { useEffect, useState } from "react";
import dataJson from "../assets/data/currencies.json";

const useCurrencyFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let mData = Object.entries(dataJson).map(([code, details]) => ({
    code,
    ...details,
  }));

  async function fetchCurrencyData(code) {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${code.toLowerCase()}.json`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      // const price = responseData.data.defaultPair.price;
      // const timestamp = new Date(responseData.data.timestamp).toLocaleString();
      const time = responseData.date;
      const price = responseData[code.toLowerCase()].vnd;

      mData = mData.map((item) =>
        item.code === code ? { ...item, priceVND: price, timeUpdate: time }: item);
} catch (error) {
      console.error(`Error fetching currency data for ${code}:`, error);
    }
  }

  async function updateCurrencyData() {
    try {
      setLoading(true);
      const updatedData = await Promise.all(
        mData.map(({ code }) => fetchCurrencyData(code))
      );
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
  }, []);

  return {
    data,
    error,
    loading,
  };
};

export default useCurrencyFetch;
