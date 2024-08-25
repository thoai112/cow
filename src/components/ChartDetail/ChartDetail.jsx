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
import { useGetCryptoHistoryQuery } from "../../hooks/cryptoApi";
import { openFullscreen } from "../../utils/logicHandle";
import { priceConvert } from "../../utils/logicHandle";
import { AiOutlineExpand } from "react-icons/ai";
import { convertTime, convertDate } from "../../utils/logicHandle";
import moment from "moment/moment";
import "./ChartDetail.css";

function ChartDetail({ coinDetail }) {
  const [timePeriod, setTimePeriod] = useState(0);
  // const [selectedData, setSelectedData] = useState(null);

  const listPeriod = ["12h", "1D", "1W", "1M", "1Y", "5Y", "All"];
  const listPeriodConvert = ["12h", "1d", "7d", "1m", "5y", "10y" ];
  const listFormat = [
    "kk:mm",
    "Do MMM",
    "Do MMM",
    "Do MMM",
    "MMM YY",
    "MMM YY",
  ];
  // const listTickGap = [60, 60, 60, 60, 60];

  const chartRef = useRef(null);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: coinDetail?.uuid,
    timePeriod: listPeriodConvert[timePeriod],
  });

 
  const [settingChart, setSettingChart] = useState({
    width: 1100,
    height: 450,
    margin: { top: 5, right: 10, bottom: 5, left: 10 },
  });
  const strokeColor = coinDetail?.change < 0 ? "#721505" : "#2fbdf5";

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
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
  }, []);

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(coinHistory?.data?.history[i].timestamp);
  }

  const data = coinPrice.map((coin, index) => {
    return {
      TimeLabel: moment(coinTimestamp[index] * 1000).format(
        listFormat[timePeriod]
      ),
      time: coinTimestamp[index],
      price: Number(coin),
      timeConvert: convertDate(coinTimestamp[index]),
    };
  });

  const reverseData = data.reverse();
  // console.log("data", coinPrice);
  // console.log("timeslare", coinTimestamp);
  // console.log("revaersa", reverseData);

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

  const handleBrushChange = ({ startIndex, endIndex }) => {
    const selectedData = reverseData.slice(startIndex, endIndex + 1);
    const min = Math.min(...selectedData.map((data) => data.price));
    const max = Math.max(...selectedData.map((data) => data.price));
    const tailValue = selectedData[selectedData.length - 1].price;
    const timeStart = selectedData[0].time;
    const timeEnd = selectedData[selectedData.length - 1].time;
  };

  return (
    <>
      <div className="chartDetailWrapper">
        <div className="chartHeader">
          <div className="chartHeader__currency">
            <div className="currency__container">
              <div className="currency__name">{coinDetail?.name} to USD</div>
              <span
                className="percentage__change"
                style={{
                  color: coinDetail?.change < 0 ? "#721505" : "#2fbdf5",
                }}
              >
                {coinDetail?.change} % ({listPeriodConvert[timePeriod]})
              </span>
            </div>
            <span className="currency__conversion">
              US Dollar to Vietnamese Dong
            </span>
          </div>
          <div className="chartHeader__price">
            1 USD = 24,986.4 VND Aug 22, 2024, 10:29 UTC
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
                onChange={handleBrushChange}
              >
                <AreaChart>
                  <Area
                    type="monotone"
                    dataKey="price"
                    strokeWidth="1"
                    stroke={strokeColor}
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
              <XAxis dataKey="TimeLabel" minTickGap={60} />
              <YAxis
                padding={{ top: 30, bottom: 10 }}
                dataKey="price"
                type="number"
                domain={["auto", "auto"]}
              >
                <Label fill="#fff" value="USD" position="insideTop" />
              </YAxis>

              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="price"
                strokeWidth="2"
                stroke={strokeColor}
                dot={<></>}
                fillOpacity={1} fill="url(#colorUv)" 
              />
              <ReferenceLine
                y={reverseData[0]?.price}
                stroke="#fff"
                strokeDasharray="2"
              >
                <Label fill="#fff">{priceConvert(reverseData[0]?.price)}</Label>
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
