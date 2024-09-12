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
} from "../../utils/logicHandle";
import moment from "moment/moment";
import "./ChartDetail.css";
import useTrendingChartFetch from "../../hooks/useTrendingChartFetch";

function ChartDetail({ chartDetail }) {
  const [timePeriod, setTimePeriod] = useState(1);

  const listPeriod = ["24h", "1W", "1M", "1Y"];
  const listPeriodConvert = ["24h", "7d", "30d", "1y"];
  const listFormat = [
    "kk:mm",
    "Do MMM",
    "Do MMM",
    "Do MMM",
    "MMM YY",
    "MMM YY",
  ];

  const chartRef = useRef(null);

  const { data: dataHistory = [], loading } = useTrendingChartFetch(
    chartDetail?.type,
    chartDetail?.name?.toLowerCase(),
    listPeriodConvert[timePeriod]
  );

  const [settingChart, setSettingChart] = useState({
    width: 1000,
    height: 350,
    margin: { top: 5, right: 10, bottom: 5, left: 10 },
  });

  useEffect(() => {
    if (!chartDetail) {
      console.log("chartDetail is null or undefined");
      return;
    }
  }, [chartDetail, dataHistory]);

  function exitHandler() {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setSettingChart({
        width: 1000,
        height: 350,
        margin: { top: 5, right: 75, bottom: 5, left: 30 },
      });
    }
  }

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
  }, []);

  const currencyPrice = [];
  const currencyTimestamp = [];

  Object.keys(chartDetail?.rate).forEach((timestamp) => {
    currencyTimestamp.push(Number(timestamp));
    currencyPrice.push(chartDetail?.rate[timestamp]);
  });
  
  const data = currencyPrice.map((price, index) => {
    return {
      TimeLabel: moment(currencyTimestamp[index]).format(listFormat[timePeriod]),
      time: currencyTimestamp[index],
      price: Number(price),
      timeConvert: convertDate(currencyTimestamp[index]),
    };
  });
  const reverseData = data.slice(0, data.length);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="intro">
            <div className="date">{convertDate(payload[0]?.payload?.time)}</div>
            <div className="time">{convertTime(payload[0]?.payload?.time)}</div>
          </div>
          <div className="label">
            <span>
              Price:{" "}
              {`${priceConvert(payload[0].value)} ${dataHistory?.to?.symbol}`}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="chartDetailWrapper">
        <div className="chartHeader">
          <div className="chartHeader__currency">
            <div className="currency__container">
              <div className="currency__name">
                {loading ? "Loading..." : chartDetail?.name}
              </div>
              <span
                className="percentage__change"
                style={{
                  color: dataHistory?.change < 0 ? "red" : "green",
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
          1 {chartDetail?.name} = {Number(chartDetail?.endRate).toFixed(3)}
            {dataHistory?.to?.symbol}
            {new Date().toUTCString()}
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
              data={reverseData}
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
                    stroke={
                      ((reverseData.slice(-1)[0]?.price -
                        reverseData[0]?.price) /
                        reverseData[0]?.price) *
                        100 <
                      0
                        ? "red"
                        : "green"
                    }
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
                y={reverseData[0]?.price}
                stroke="#fff"
                strokeDasharray="2"
              >
                <Label fill="#fff">
                  {priceConvert(reverseData[0]?.price)}
                </Label>
              </ReferenceLine>
            </LineChart>
          </ResponsiveContainer>
        </div>
     </div>
    </>
  );
}

export default ChartDetail;