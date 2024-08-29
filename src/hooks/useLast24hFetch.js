import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import { io } from "socket.io-client";
const socket = io(`${API_URL}`);


const useLast24hFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected to server");
    });

    socket.on("data24h-rate", (newData) => {
      console.log("Live region received");
      setLoading(false);
      setData(newData);
    });
    return () => {
      socket.off("connection");
      socket.off("data24h-rate");
      setLoading(false);
    };
  },[]);


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/v1/currency/realtime`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (error) {
        console.error("Error updating last24h data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return {
    data,
    error,
    loading,
  };
};


export default useLast24hFetch;

