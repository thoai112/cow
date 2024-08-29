import React, { useState, useEffect } from "react";
import { priceConvert } from "../../utils/logicHandle";
import "./Converter.css";
import converter from "../../assets/images/converter.png";
import useConverterFetch from "../../hooks/useConverterFetch";

function Converter() {
  const [price, setPrice] = useState([]);
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [flexDirection, setFlexDirection] = useState("column");
  const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("");
  const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");

  const { data: liveConverter, converterLoading } = useConverterFetch();
  useEffect(() => {
    if (!converterLoading && liveConverter?.rates) {
      setPrice(liveConverter.rates[0]);
      setSelectedCurrencyFrom(Object.keys(liveConverter.rates[0])[0]);
      setSelectedCurrencyTo(Object.keys(liveConverter.rates[0])[147]);


    }
  }, [liveConverter, converterLoading]);
  


  const handleCurrencyChangeFrom = (e) => {
    setSelectedCurrencyFrom(e.target.value);

  };

  const handleCurrencyChangeTo = (e) => {
    setSelectedCurrencyTo(e.target.value);

  };

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
          className="convertIcon"
          src={converter}
          onClick={convertFunction}
          alt="convertIcon"
        />
        <div className="coin">
          <div className="icon">
            {selectedCurrencyFrom && (
              <img
                src={`https://www.xe.com/svgs/flags/${selectedCurrencyFrom.toLowerCase()}.static.svg`}
                alt={`${selectedCurrencyFrom.toLowerCase()} icon`}
              />
            )}
          </div>
          <div className="info">
            {converterLoading ? (
              <div>Loading...</div>
            ) : (
              <select
                className="custom-dropdown"
                value={selectedCurrencyFrom}
                onChange={handleCurrencyChangeFrom}
              >
                {price ? (
                  Object.keys(price).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            )}
          </div>
          <input
            type="text"
            value={fromPrice}
            onChange={(e) => {
              setFromPrice(e.target.value);
              setToPrice(
                priceConvert(
                  Number(e.target.value) * selectedCurrencyTo ==="VND" ? price[selectedCurrencyFrom]/price[selectedCurrencyTo] : price[selectedCurrencyFrom]
                )
              );
            }}
          />
        </div>
        <div className="usd">
        <div className="icon">
            {selectedCurrencyTo && (
              <img
                src={`https://www.xe.com/svgs/flags/${selectedCurrencyTo.toLowerCase()}.static.svg`}
                alt={`${selectedCurrencyTo.toLowerCase()} icon`}
              />
            )}
          </div>
          <div className="info">

            {converterLoading ? (
              <div>Loading...</div>
            ) : (
              <select
                className="custom-dropdown"
                value={selectedCurrencyTo}
                onChange={handleCurrencyChangeTo}
              >
                {price ? (
                  Object.keys(price).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            )}
          </div>
          <input
            type="text"
            value={toPrice}
            onChange={(e) => {
              setToPrice(e.target.value);
              setFromPrice(
                priceConvert(e.target.value / price[selectedCurrencyTo])
              );
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Converter;