import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../utils/config";


const socket = io(`${API_URL}`);

const useTrendingChartFetch = (type, symbol, time) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      socket.on("connection", () => {
        console.log("connected to server");
      });

      socket.on("trending-chart", (newData) => {
        console.log("Live chart data received");
        setLoading(false);
        setData(newData);
      });
      return () => {
        socket.off("connection");
        socket.off("trending-chart");
      };
    },[]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ type: type, symbol: symbol, time: time });
        const url = `${API_URL}/api/v1/currency/livetrendingchart?${params.toString()}`;
       
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
  }, [type, symbol, time]);

  return {
    data,
    error,
    loading,
  };
};



export default useTrendingChartFetch;
