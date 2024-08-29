import { useEffect, useState } from "react";
import { API_URL } from "../utils/config";
import { io } from "socket.io-client";
const socket = io(`${API_URL}`);


const useRegionFetch = () => {
  const [region, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connected to server");
    });

    socket.on("region", (newData) => {
      console.log("Live region received");
      setLoading(false);
      setData(newData);
    });
    return () => {
      socket.off("connection");
      socket.off("region");
      setLoading(false);
    };
  },[]);


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/v1/currency/liveregion`);
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
  }, []);

  return {
    region,
    error,
    loading,
  };
};


export default useRegionFetch;

