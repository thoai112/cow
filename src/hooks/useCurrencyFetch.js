import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../utils/config";
import { formatDate } from "../utils/formatDate";
const socket = io(`${API_URL}`);

const useCurrencyFetch = (date) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false);

  useEffect(() => {
    if (isRealTimeEnabled) {
      socket.on("connection", () => {
        console.log("connected to server");
      });

      socket.on("get-data", (newData) => {
        console.log("newData", newData);
        setLoading(false);
        setData(newData);
      });

      return () => {
        socket.off("connection");
        socket.off("get-data");
      };
    }
  }, [isRealTimeEnabled]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const presentTime = formatDate(new Date());
        const selectedDate = formatDate(new Date(date));

        const dateDifference =
          new Date(presentTime).getDate() - new Date(selectedDate).getDate();
        console.log("dateDifference", dateDifference);
        let url;
        if (dateDifference === 0) {
          setIsRealTimeEnabled(true);
          url = `${API_URL}/api/chart/currency`;
        } else {
          setIsRealTimeEnabled(false);
          const params = new URLSearchParams({ date: selectedDate });
          url = `${API_URL}/api/chart/currencydate?${params.toString()}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (error) {
        console.error("Error updating currency data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, [date]);

  return {
    data,
    error,
    loading,
  };
};

export default useCurrencyFetch;

