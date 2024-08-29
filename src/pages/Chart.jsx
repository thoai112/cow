import React, { useState, useEffect } from "react";
import StickySidebar from "sticky-sidebar";
import "../style/chart.css";
import ChartDetail from "../components/ChartDetail/ChartDetail";
import Converter from "../components/Converter/Converter";
import Card from "../components/Card/Card";
import LastNew from "../components/LastNew/LastNew";
import Trending from "../components/Trending/Trending";
import useRegionFetch from "../hooks/useRegionFetch";
import useLast24hFetch from "../hooks/useLast24hFetch";

const Chart = () => {
  const [isNews, setIsNews] = useState(true);
  const [isShowCard, setIsShowCard] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [selected, setSelected] = useState(null);

  const mergeData = (regionData, last24hData) => {
    const last24hMap = last24hData.reduce((acc, item) => {
      acc[item.from] = item.batchList;
      return acc;
    }, {});

    return regionData.map((regionItem) => {
      const fromCode = regionItem.from.code;
      const batchList = last24hMap[fromCode] || [];
      return {
        ...regionItem,
        batchList,
      };
    });
  };
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

  const { region: regionData = [], loading: regionLoading } = useRegionFetch();

  const { data: last24hData = [], loading: last24hLoading } = useLast24hFetch();

  useEffect(() => {
    if (!regionLoading && !last24hLoading) {
      const mergedData = mergeData(regionData.data, last24hData.data);
      setCardData(mergedData);
      setIsShowCard(false);
      setSelected(mergedData[0] || null);
    }
  }, [regionLoading, last24hLoading, regionData, last24hData]);

  const handleCardClick = (data) => {
    setSelected(data);
  };

  // const { data, isFetching } = useGetCryptoQuery({
  //   coinId: "a91GCGd_u96cF",
  //   timePeriod: "24h",
  // });

  // if (isFetching) return "Loading...";
  // const coinDetail = data.data.coin;

  return (
    <>
      <div className="main-content">
        <aside id="left__sidebar">
          {isShowCard ? (
            <p>Loading...</p>
          ) : (
            cardData.map((region, index) => (
              <Card
                key={index}
                region={region}
                onClick={() => handleCardClick(region)}
              />
            ))
          )}
        </aside>
        <div className="chart__center">
          <div className="chartWrapper">
            {isShowCard ? (
              <p>Loading...</p>
            ) : (
              <ChartDetail chartDetail={selected} />
            )}
          </div>
        </div>
        <div className="right__sidebar">
          <Converter />
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
