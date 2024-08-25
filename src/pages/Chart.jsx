import React, { useState, useEffect } from "react";
import StickySidebar from "sticky-sidebar";
import "../style/chart.css";
import ChartDetail from "../components/ChartDetail/ChartDetail";
import { useGetStatsQuery, useGetCryptoQuery } from "../hooks/cryptoApi";
import Converter from "../components/Converter/Converter";
import Card from "../components/Card/Card";
import LastNew from "../components/LastNew/LastNew";
import Trending from "../components/Trending/Trending";
import useFetchLiveChart from "../hooks/useFetchLiveChart";

const Chart = () => {
  const [isNews, setIsNews] = useState(true);
  useEffect(() => {
    const rightSidebarElement = document.querySelector(".right-sidebar");
    const mainContentElement = document.querySelector(".main-content");

    if (rightSidebarElement && mainContentElement) {
      const rightSidebar = new StickySidebar(".right-sidebar", {
        containerSelector: ".main-content",
        innerWrapperSelector: ".sidebar__inner",
      });

      return () => {
        rightSidebar.destroy();
      };
    }
  }, []);
  
  const { data: mData, loading } = useFetchLiveChart("AED");

  console.log("data not swr", mData);

  const { data, isFetching } = useGetCryptoQuery({
    coinId: "a91GCGd_u96cF",
    timePeriod: "24h",
  });

  if (isFetching) return "Loading...";
  const coinDetail = data.data.coin;

  const cards = Array.from({ length: 20 }, (_, index) => (
    <Card coinDetail={coinDetail} />
  ));

  return (
    <>
      <div className="main-content">
        <aside id="left__sidebar">{cards}</aside>
        <div className="chart__center">
          <div className="chartWrapper">
            <ChartDetail coinDetail={coinDetail} />
          </div>
        </div>
        <div className="right__sidebar">
          <Converter coinDetail={coinDetail} />
          <Trending />
          <div className="tableTrend">
            <div className="mainNavigate">
              <div
                className={!isNews ? `btnNavigate active` : `btnNavigate`}
                onClick={() => {
                  setIsNews(false);
                }}
              >
                Overview
              </div>
              <div
                className={isNews ? `btnNavigate active` : `btnNavigate`}
                onClick={() => {
                  setIsNews(true);
                }}
              >
                News
              </div>
            </div>
            {isNews ? (
              <div className="news-container">
                {Array.from({ length: 10 }).map((_, index) => (
                  <LastNew key={index} />
                ))}
              </div>
            ) : (
              <h2>Trending</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
