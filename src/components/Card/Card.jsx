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
    timePeriod: "7d",
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
      TimeLabel: moment(coinTimestamp[index] * 1000).format(listFormat["7dh"]),
      time: coinTimestamp[index],
      price: Number(coin),
      timeConvert: convertDate(coinTimestamp[index]),
    };
  });

  const reverseDatax = data.reverse();

  console.log("mikiyayaya", reverseDatax);

  return (
    <>
      <div className="cardDetail">
        <div className="cardDetail__columns">
          <div className="cardDetail__currency">USD/VND</div>

          <ResponsiveContainer width={"99%"} height={55}>
            <AreaChart
              className="lineChart"
              width={85}
              height={55}
              data={reverseDatax}
            >
              <Area
                type="monotone"
                dataKey="price"
                stroke="#55c7e4"
                fill="#1da3d8"
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
