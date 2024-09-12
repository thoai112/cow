import React, { useState, useEffect } from "react";
import "./Card.css";
import { Sparklines, SparklinesLine } from "react-sparklines";

import useLazyLoad from "../../hooks/useLazyLoad";

const Card = ({ data, onClick }) => {
  const [isVisible, ref] = useLazyLoad();

  const [currencyPrice, setCurrencyPrice] = useState([]);

  useEffect(() => {
    const rateData = data?.rate || {};
    const timestamps = Object.keys(rateData);
    const newCurrencyPrice = [];

    timestamps.forEach(timestamp => {
      newCurrencyPrice.push(rateData[timestamp]);
    });

    setCurrencyPrice(newCurrencyPrice);
  }, [data]);


  return (
    <>
      <div ref={ref} className="cardDetail" onClick={onClick}>
        {isVisible ? (
          <div className="cardDetail__columns">
            <div className="cardDetail__currency">
              {data.name}/{data.to.code}
            </div>
            {isVisible && (
              <svg
              className="card__chart"
              width="40%"
              height="100%"
              viewBox="0 0 100 40"
              style={{ marginLeft: '5%', marginTop: '2%' }}
            >
                <Sparklines
                  data={currencyPrice.slice(
                    0,
                    currencyPrice.length
                  )}
                >
                  <SparklinesLine
                    color={data?.change < 0 ? "red" : "green"}
                  />
                </Sparklines>
              </svg>
            )}
            <div className="cardDetail__column">
              <div className="cardDetail__column--price">
                {data.endRate.toFixed(2)}
              </div>
              <div className={`cardDetail__column--valuechange`}>
                {data?.change
                  ? (() => {
                      const color = data.change < 0 ? "red" : "green";
                      const sign = data.change > 0 ? "+" : "";
                      return (
                        <span style={{ color }}>
                          {sign} {data.change.toFixed(2)} %
                        </span>
                      );
                    })()
                  : "N/A"}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Card;
