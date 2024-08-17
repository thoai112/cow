import { useEffect, useState } from "react";
// import dataJson from "../assets/data/currencies.json";
import { io } from "socket.io-client";
import { API_URL } from "../utils/config";
const socket = io(`${API_URL}`);

const useCurrencyFetch = url => {
  const [data, setData] = useState([]);
  const [cowValue, setCowValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
    socket.on('connection', () => {
      console.log('connected to server');
    })

    socket.on('get-data', (newData) => {
      setData(newData)
    })

  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url)
        const getData = response.json();
        setData(getData.currency.filter(item => item !== null));
        setCowValue(getData.cowValue);
        setLoading(false);
      } catch (error) {
          console.error("Error updating currency data:", error);
          setError(error.message);
          setLoading(false);
        }
      }

    getData();
  }, [url])


  // async function fetchCurrencyData(code) {
  //   const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${code.toLowerCase()}.json`;

  //   try {
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     const time = responseData.date;
  //     const price = responseData[code.toLowerCase()].vnd;

  //     const updatedItem = mData.find((item) => item.code === code);
  //     if (updatedItem) {
  //       updatedItem.priceVND = price;
  //       updatedItem.timeUpdate = time;
  //     }

  //     return updatedItem;
  //   } catch (error) {
  //     console.error(`Error fetching currency data for ${code}:`, error);
  //     return null;
  //   }
  // }



  // let mData = Object.entries(dataJson).map(([code, details]) => ({
  //   code,
  //   ...details,
  // }));

  // async function fetchCurrencyData(code) {
  //   const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${code.toLowerCase()}.json`;

  //   try {
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     const time = responseData.date;
  //     const price = responseData[code.toLowerCase()].vnd;

  //     const updatedItem = mData.find((item) => item.code === code);
  //     if (updatedItem) {
  //       updatedItem.priceVND = price;
  //       updatedItem.timeUpdate = time;
  //     }

  //     return updatedItem;
  //   } catch (error) {
  //     console.error(`Error fetching currency data for ${code}:`, error);
  //     return null;
  //   }
  // }

  // async function updateCurrencyData() {
  //   try {
  //     setLoading(true);
  //     const updatedData = await Promise.all(
  //       mData.map(({ code }) => fetchCurrencyData(code))
  //     );
  //     setData(updatedData.filter(item => item !== null));
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error updating currency data:", error);
  //     setError(error.message);
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   updateCurrencyData();
  // }, [date]);

  return {
    data,
    cowValue,
    error,
    loading,
  };
};

export default useCurrencyFetch;