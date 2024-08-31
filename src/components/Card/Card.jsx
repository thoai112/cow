import React from "react";
import "./Card.css";
import { Sparklines, SparklinesLine } from "react-sparklines";

import useLazyLoad from "../../hooks/useLazyLoad";

const Card = ({ region, onClick }) => {
  const [isVisible, ref] = useLazyLoad();

  const currencyTimestamp = [];
  const currencyPrice = [];

  if (region && region.batchList) {
    region.batchList.forEach((batch) => {
      const { startTime, interval, rates } = batch;
      for (let index = 1; index < rates.length; index++) {
        const rate = rates[index];
        currencyTimestamp.push(startTime + index * interval);
        currencyPrice.push(rate - rates[0]);
      }
    });
  }


  return (
    <>
      <div ref={ref} className="cardDetail" onClick={onClick}>
        {isVisible ? (
          <div className="cardDetail__columns">
            <div className="cardDetail__currency">
              {region.from.code}/{region.to.code}
            </div>
            {isVisible && (
              <svg
              width="40%"
              height="100%"
              viewBox="0 0 100 40"
              style={{ marginLeft: '5%', marginTop: '2%' }}
            >
                <Sparklines
                  data={currencyPrice.slice(
                    currencyPrice.length - 150,
                    currencyPrice.length
                  )}
                >
                  <SparklinesLine
                    color={region?.change < 0 ? "red" : "green"}
                  />
                </Sparklines>
              </svg>
            )}
            <div className="cardDetail__column">
              <div className="cardDetail__column--price">
                {region.rateEnd.toFixed(3)}
              </div>
              <div className={`cardDetail__column--valuechange`}>
                {region.change
                  ? (() => {
                      const color = region.change < 0 ? "red" : "green";
                      const sign = region.change > 0 ? "+" : "";
                      return (
                        <span style={{ color }}>
                          {sign} {region.change.toFixed(2)} %
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
