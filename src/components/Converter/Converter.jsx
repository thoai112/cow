import React, { useState } from "react";
import { useGetCryptoRefetchQuery } from "../../hooks/cryptoApi";
import { priceConvert } from "../../utils/logicHandle";
import "./Converter.css";
import converter from "../../assets/images/converter.png";

function Converter({ coinDetail }) {
  const [coinPrice, setCoinPrice] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0);
  const [flexDirection, setFlexDirection] = useState("column");

  const { data } = useGetCryptoRefetchQuery(coinDetail.uuid);

  const convertFunction = function () {
    if (flexDirection === "column-reverse") {
      setFlexDirection("column");
    } else {
      setFlexDirection("column-reverse");
    }
  };

  return (
    <>
      <div className="convertWrapper" style={{ flexDirection: flexDirection }}>
        <img
          className="convertIcon" src={converter}
          onClick={convertFunction}
          alt="convertIcon"
        />
        <div className="coin">
          <div className="icon">
            <img src={coinDetail.iconUrl} alt={coinDetail.symbol} />
          </div>
          <div className="info">
            <div className="symbol">{coinDetail.symbol}</div>
            {/* <div className="fullName">{coinDetail.name}</div> */}
          </div>
          <input
            type="text"
            value={coinPrice}
            onChange={(e) => {
              setCoinPrice(e.target.value);
              setUsdPrice(
                priceConvert(Number(e.target.value) * data?.data.coin.price)
              );
            }}
          />
        </div>
        <div className="usd">
          <div className="icon">
            <img
              src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg"
              alt="USD icon"
            />
          </div>
          <div className="info">
            <div className="symbol">VND</div>
            {/* <div className="fullName">VIET NAM</div> */}
          </div>
          <input
            type="text"
            value={usdPrice}
            onChange={(e) => {
              setUsdPrice(e.target.value);
              setCoinPrice(
                priceConvert(e.target.value / data?.data.coin.price)
              );
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Converter;
