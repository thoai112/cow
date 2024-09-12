import React, { useState, useEffect, useRef } from "react";
import StickySidebar from "sticky-sidebar";
import "../style/chart.css";
import ChartDetail from "../components/ChartDetail/ChartDetail";
import Card from "../components/Card/Card";

import useRegionFetch from "../hooks/useRegionFetch";
import useLast24hFetch from "../hooks/useLast24hFetch";
import useTrendingFetch from "../hooks/useTrendingFetch";

import {
  SymbolOverview,
  TickerTape,
  Timeline,
  MarketData,
  StockMarket,
  AdvancedRealTimeChart,
  CryptoCurrencyMarket,
  ForexCrossRates,
  ForexHeatMap,
  MiniChart,
  Screener,
  StockHeatmap,
} from "react-ts-tradingview-widgets";

const Chart = () => {
  const [isShowCard, setIsShowCard] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedOption, setSelectedOption] = useState("crypto");
  const sideBarRef = useRef(null);

  // const mergeData = (regionData, last24hData) => {
  //   const last24hMap = last24hData.reduce((acc, item) => {
  //     acc[item.from] = item.batchList;
  //     return acc;
  //   }, {});

  //   return regionData.map((regionItem) => {
  //     const fromCode = regionItem.from.code;
  //     const batchList = last24hMap[fromCode] || [];
  //     return {
  //       ...regionItem,
  //       batchList,
  //     };
  //   });
  // };

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

  const { data: trendingData = [], loading: trendingLoading } =
    useTrendingFetch();

  useEffect(() => {
    if (!trendingLoading) {
      setCardData(trendingData.data);
      setSelected(trendingData.data[0]); // Set default value of selected to trendingData[0]
      setIsShowCard(false);
    }
  }, [trendingLoading, trendingData]);

  useEffect(() => {
    if (!trendingLoading) {
      // const mergedData = mergeData(regionData.data, last24hData.data);
      setCardData(trendingData.data);
      setIsShowCard(false);
    }
  }, [trendingLoading, trendingData]);

  const handleCardClick = (data) => {
    setSelected(data);
  };

  const toggleSideBar = () => {
    if (sideBarRef.current) {
      sideBarRef.current.classList.toggle("show__sidebar");
    }
  };

  return (
    <>
      <div className="chart">
        <TickerTape colorTheme="dark" isTransparent="true"></TickerTape>
        <div className="nav__sideBar" ref={sideBarRef} onClick={toggleSideBar}>
          {isShowCard ? (
            <p>Loading...</p>
          ) : (
            cardData.map((data, index) => (
              <Card
                key={index}
                data={data}
                onClick={() => handleCardClick(data)}
              />
            ))
          )}
        </div>
        <div className="main-content">
          <div className="chart__center">
            <div className="chartWrapper">
              <div className="responsiveChartContainer">
                {trendingLoading ? (
                  <div>Loading...</div>
                ) : (
                  selected && <ChartDetail chartDetail={selected} />
                )}
              </div>
            </div>

            <div className="mainNavigate">
              <div
                className={
                  selectedOption === "crypto"
                    ? `btnNavigate active`
                    : `btnNavigate`
                }
                onClick={() => setSelectedOption("crypto")}
              >
                Cryptocurrency
              </div>
              <div
                className={
                  selectedOption === "forex"
                    ? `btnNavigate active`
                    : `btnNavigate`
                }
                onClick={() => setSelectedOption("forex")}
              >
                Forex
              </div>
              <div
                className={
                  selectedOption === "screener"
                    ? `btnNavigate active`
                    : `btnNavigate`
                }
                onClick={() => setSelectedOption("screener")}
              >
                Screener
              </div>
              <div
                className={
                  selectedOption === "news"
                    ? `btnNavigate active`
                    : `btnNavigate`
                }
                onClick={() => setSelectedOption("news")}
              >
                News
              </div>
            </div>
            {selectedOption === "forex" ? (
              <ForexHeatMap
                colorTheme="dark"
                width="100%"
                height={200}
                isTransparent="True"
              />
            ) : selectedOption === "crypto" ? (
              <CryptoCurrencyMarket
                colorTheme="dark"
                width="100%"
                height={300}
                isTransparent="true"
              />
            ) : selectedOption === "screener" ? (
              <Screener
                colorTheme="dark"
                width="100%"
                height={300}
                isTransparent="true"
              />
            ) : (
              <Timeline
                colorTheme="dark"
                height={400}
                width="100%"
                isTransparent="true"
              ></Timeline>
            )}
            {/* <Timeline
              colorTheme="dark"
              height={400}
              width="100%"
              isTransparent="true"
            ></Timeline> */}
          </div>
          <div className="right__sidebar">
            {isShowCard ? (
              <p>Loading...</p>
            ) : (
              cardData.map((data, index) => (
                <Card
                  key={index}
                  data={data}
                  onClick={() => handleCardClick(data)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
