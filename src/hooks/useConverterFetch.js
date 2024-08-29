import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import { io } from "socket.io-client";
const socket = io(`${API_URL}`);


const useConverterFetch = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected to server");
    });

    socket.on("converter-rate", (newData) => {
      console.log("Live region received");
      setLoading(false);
      setData(newData);
    });
    return () => {
      socket.off("connection");
      socket.off("converter-rate");
      setLoading(false);
    };
  },[]);


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/v1/currency/converter`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (error) {
        console.error("Error updating converter data:", error);
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


export default useConverterFetch;

