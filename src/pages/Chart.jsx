import React, { useState, useEffect } from "react";
import StickySidebar from "sticky-sidebar";
import "../style/chart.css";
import ChartDetail from "../components/ChartDetail/ChartDetail";
import Converter from "../components/Converter/Converter";
import Card from "../components/Card/Card";

import useRegionFetch from "../hooks/useRegionFetch";
import useLast24hFetch from "../hooks/useLast24hFetch";

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
} from "react-ts-tradingview-widgets";

const Chart = () => {
  const [isShowCard, setIsShowCard] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedOption, setSelectedOption] = useState("crypto");

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
    }
  }, [regionLoading, last24hLoading, regionData, last24hData]);

  const handleCardClick = (data) => {
    setSelected(data);
  };

  return (
    <>
      <div className="chart">
        <TickerTape colorTheme="dark" isTransparent="true"></TickerTape>
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
              <div className="responsiveChartContainer">
                {selected === null ? (
                  <AdvancedRealTimeChart
                    className="responsiveChart"
                    theme="dark"
                    symbol="BTC"
                    backgroundColor="rgb(17, 46, 66)"
                    hide_side_toolbar="true"
                    autosize
                  />
                ) : (
                  <ChartDetail chartDetail={selected} />
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
          </div>
          <div className="right__sidebar">
            <Converter />
            <TickerTape colorTheme="dark" isTransparent="true"></TickerTape>
            <StockMarket
              colorTheme="dark"
              height={800}
              width="100%"
              isTransparent="true"
            ></StockMarket>
            <MiniChart
              colorTheme="dark"
              width="100%"
              height="9%"
              isTransparent="true"
              symbol="FX:EURUSD"
            ></MiniChart>
            <MiniChart
              colorTheme="dark"
              width="100%"
              height="9%"
              isTransparent="true"
              symbol="BTCUSD"
            ></MiniChart>
            <MiniChart
              colorTheme="dark"
              width="100%"
              height="9%"
              isTransparent="true"
              symbol="ETHUSD"
            ></MiniChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
