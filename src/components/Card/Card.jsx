import React from "react";
import "./Card.css";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  Line,
  LineChart,
} from "recharts";
import { convertTime, convertDate } from "../../utils/logicHandle";
import { useGetCryptoHistoryQuery } from "../../hooks/cryptoApi";
import moment from "moment/moment";

const Card = ({ coinDetail }) => {
  const listFormat = [
    "kk:mm",
    "Do MMM",
    "Do MMM",
    "Do MMM",
    "MMM YY",
    "MMM YY",
  ];
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId: coinDetail?.uuid,
    timePeriod: "1y",
  });
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
      TimeLabel: moment(coinTimestamp[index] * 1000).format(listFormat["1y"]),
      time: coinTimestamp[index],
      price: Number(coin),
      timeConvert: convertDate(coinTimestamp[index]),
    };
  });

  const reverseDatax = data.reverse();

  return (
    <>
      <div className="cardDetail">
        <div className="cardDetail__columns">
          <div className="cardDetail__currency">USD/VND</div>

          <ResponsiveContainer width={"45%"} height={50}>
            <AreaChart
              margin={{ top: 0, right: 0, left: 15, bottom: 0 }}
              className="lineChart"
              width={50}
              height={50}
              data={reverseDatax}
            >
              <defs>
                <linearGradient id="cardGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6ae97b" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#087c0e" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="price"
                strokeWidth="2"
                stroke="#54b054"
                fill="url(#cardGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="cardDetail__column">
            <div className="cardDetail__column--price">Khác</div>
            <div className="cardDetail__column--valuechange">+22,700</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
