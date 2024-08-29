import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Label,
  ReferenceLine,
} from "recharts";
import { openFullscreen } from "../../utils/logicHandle";
import { priceConvert } from "../../utils/logicHandle";
import { AiOutlineExpand } from "react-icons/ai";
import {
  convertTime,
  convertDate,
  roundTimestamp,
} from "../../utils/logicHandle";
import moment from "moment/moment";
import useLiveChartFetch from "../../hooks/useLiveChartFetch";
import "./ChartDetail.css";

function ChartDetail({ chartDetail }) {
  const [timePeriod, setTimePeriod] = useState(0);
  const [timeStamp, setTimeStamp] = useState(new Date().getTime());

  const listPeriod = ["12h", "1D", "1W", "1M", "1Y", "5Y", "10Y"];
  const listPeriodConvert = ["12h", "1d", "7d", "1m", "1y", "5y", "10y"];
  const listFormat = [
    "kk:mm",
    "Do MMM",
    "Do MMM",
    "Do MMM",
    "MMM YY",
    "MMM YY",
  ];

  const chartRef = useRef(null);

  const { data: dataHistory = [], loading } = useLiveChartFetch(
    chartDetail?.from?.code ?? "AED",
    chartDetail?.to?.code ?? "VND"
  );

  const [settingChart, setSettingChart] = useState({
    width: 1100,
    height: 450,
    margin: { top: 5, right: 10, bottom: 5, left: 10 },
  });

  function exitHandler() {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setSettingChart({
        width: 1000,
        height: 450,
        margin: { top: 5, right: 75, bottom: 5, left: 30 },
      });
    }
  }

  useEffect(() => {
    if (timePeriod === 0) {
      setTimeStamp(roundTimestamp(dataHistory.timestamp, 12, 0, 0, 0));
    }
    if (timePeriod === 1) {
      setTimeStamp(roundTimestamp(dataHistory.timestamp, 0, 1, 0, 0));
    }
    if (timePeriod === 2) {
      setTimeStamp(roundTimestamp(dataHistory.timestamp, 0, 7, 0, 0));
    }
    if (timePeriod === 3) {
      setTimeStamp(roundTimestamp(dataHistory.timestamp, 0, 0, 1, 0));
    }
    if (timePeriod === 4) {
      setTimeStamp(roundTimestamp(dataHistory.timestamp, 0, 0, 0, 1));
    }
    if (timePeriod === 5) {
      setTimeStamp(roundTimestamp(dataHistory.timestamp, 0, 0, 0, 5));
    }
    if (timePeriod === 6) {
      setTimeStamp(roundTimestamp(dataHistory.timestamp, 0, 0, 0, 10));
    }
  }, [timePeriod, dataHistory.timestamp]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
  }, []);

  const currencyPrice = [];
  const currencyTimestamp = [];

  if (dataHistory && dataHistory.batchList) {
    dataHistory.batchList.forEach((batch) => {
      const { startTime, interval, rates } = batch;
      for (let index = 1; index < rates.length; index++) {
        const rate = rates[index];
        currencyTimestamp.push(startTime + index * interval);
        currencyPrice.push(rate - rates[0]);
      }
    });
  }

  const data = currencyPrice.map((price, index) => {
    return {
      TimeLabel: moment(currencyTimestamp[index]).format(
        listFormat[timePeriod]
      ),
      time: currencyTimestamp[index],
      price: Number(price),
      timeConvert: convertDate(currencyTimestamp[index]),
    };
  });

  const index = data.findIndex((item) => item.time === timeStamp);
  const reverseData = data.slice(index, data.length);


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="intro">
            <div className="date">{convertDate(payload[0]?.payload?.time)}</div>
            <div className="time">{convertTime(payload[0]?.payload?.time)}</div>
          </div>
          <div className="label">
            <span>Price: {`$${priceConvert(payload[0].value)}`}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  // const handleBrushChange = ({ startIndex, endIndex }) => {
  //   const selectedData = reverseData.slice(startIndex, endIndex + 1);
    // const min = Math.min(...selectedData.map((data) => data.price));
    // const max = Math.max(...selectedData.map((data) => data.price));
    // const tailValue = selectedData[selectedData.length - 1].price;
    // const timeStart = selectedData[0].time;
    // const timeEnd = selectedData[selectedData.length - 1].time;
  // };

  if (!chartDetail) {
    console.log("chartDetail");

    return null;
  }

  return (
    <>
      <div className="chartDetailWrapper">
        <div className="chartHeader">
          <div className="chartHeader__currency">
            <div className="currency__container">
              <div className="currency__name">
                {chartDetail.from.code} to {chartDetail.to.code} Chart
              </div>
              <span
                className="percentage__change"
                style={{
                  color:
                    ((reverseData.slice(-1)[0]?.price - reverseData[0]?.price) /
                      reverseData[0]?.price) *
                      100 <
                    0
                      ? "red"
                      : "green",
                }}
              >
                {(
                  ((reverseData.slice(-1)[0]?.price - reverseData[0]?.price) /
                    reverseData[0]?.price) *
                  100
                ).toFixed(2)}
                %
              </span>
              <span style={{ color: "white", fontSize: "1.2rem" }}>
                ({listPeriodConvert[timePeriod]})
              </span>
            </div>
            <span className="currency__conversion">
              {dataHistory?.from?.name} to {dataHistory?.to?.name}
            </span>
          </div>

          <div className="chartHeader__price">
            1 {dataHistory?.from?.symbol} = {chartDetail.rateEnd.toFixed(3)}{" "}
            {dataHistory?.to?.symbol}{" "}
            {new Date(dataHistory.timestamp).toUTCString()}
          </div>
        </div>

        <div className="headingChart">
          <div
            className="expandBtn"
            onClick={() => {
              setSettingChart({
                width: 1400,
                height: 1000,
                margin: { top: 50, right: 150, bottom: 50, left: 150 },
              });
              openFullscreen(chartRef.current);
            }}
          >
            <AiOutlineExpand />
          </div>
          <div className="listPeriod">
            {listPeriod.map((time, index) => {
              let className = "timePeriod";
              if (index === timePeriod) className = "timePeriod active";
              return (
                <div
                  key={index}
                  onClick={() => {
                    setTimePeriod(index);
                  }}
                  className={className}
                >
                  {time}
                </div>
              );
            })}
          </div>
        </div>

        <div ref={chartRef}>
          <ResponsiveContainer width={"100%"} height={settingChart.height}>
            <LineChart
              width={settingChart.width}
              height={settingChart.height}
              margin={settingChart.margin}
              className="lineChart"
              data={timePeriod === 6 ? data : reverseData}
            >
              <Brush
                dataKey="TimeLabel"
                fill="#14d2eb3b"
                style={{ fillOpacity: 0.05 }}
              >
                <AreaChart>
                  <Area
                    type="monotone"
                    dataKey="price"
                    strokeWidth="1"
                    stroke={((reverseData.slice(-1)[0]?.price - reverseData[0]?.price) / reverseData[0]?.price * 100) < 0 ? "red" : "green"}
                    dot={<></>}
                    fill="url(#colorGradient)"
                  />
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#1da3d8" stopOpacity={0.7} />
                      <stop
                        offset="95%"
                        stopColor="#1da3d8"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
        
              </Brush>
              <XAxis dataKey="TimeLabel" minTickGap={0} />
              <YAxis
                padding={{ top: 30, bottom: 10 }}
                dataKey="price"
                type="number"
                domain={["auto", "auto"]}
              >
                <Label
                  fill="#fff"
                  value={dataHistory?.to?.code}
                  position="insideTop"
                />
              </YAxis>

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="price"
                strokeWidth="2"
                stroke={
                  ((reverseData.slice(-1)[0]?.price - reverseData[0]?.price) /
                    reverseData[0]?.price) *
                    100 <
                  0
                    ? "red"
                    : "green"
                }
                dot={<></>}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <ReferenceLine
                y={timePeriod === 6 ? data[0]?.price : reverseData[0]?.price}
                stroke="#fff"
                strokeDasharray="2"
              >
                <Label fill="#fff">
                  {priceConvert(
                    timePeriod === 6 ? data[0]?.price : reverseData[0]?.price
                  )}
                </Label>
              </ReferenceLine>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 
        <div className="chart__info">
          <div className="row"></div>
          <div className="row">{coinDetail?.name} close: high: </div>
        </div> */}
      </div>
    </>
  );
}

export default ChartDetail;
