import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../utils/config";
const socket = io(`${API_URL}`);

const useFetchLiveChart = (code) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      socket.on("connection", () => {
        console.log("connected to server");
      });

      socket.on("chart-rate", (newData) => {
        console.log("Live chart data received");
        setLoading(false);
        setData(newData);
      });
      return () => {
        socket.off("connection");
        socket.off("chart-rate");
      };
    },[]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({ from: code, to:"VND" });
        const url = `${API_URL}/api/v1/chart/livechart?${params.toString()}`;
       
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
  }, [code]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetchLiveChart;
