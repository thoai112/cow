import React from "react";
import { Carousel, Accordion } from "react-bootstrap";
import "./Trending.css";

const Trending = () => {
  return (
    <>
      <div className="topbar__cards">
        <div className="trending__card">
          <Carousel>
            <Carousel.Item>
              <div className="top">GOLD/EUR</div>
              <img
                className="custom-img" // Apply the custom CSS class
                loading="lazy"
                src="https://goldprice.org/charts/silver-price-performance-IRR_x.png?Fri Aug 23 2024 11:05:50 GMT+0000 (Greenwich Mean Time)"
                alt="gold_chart"
              />
            </Carousel.Item>
            <Carousel.Item>
              <div className="top">GOLD/USD</div>
              <img
                className="custom-img"
                loading="lazy"
                src="https://goldprice.org/charts/silver-price-performance-IRR_x.png?Fri Aug 23 2024 11:05:50 GMT+0000 (Greenwich Mean Time)"
                alt="gold_chart"
              ></img>
            </Carousel.Item>
            <Carousel.Item>
              <div className="top">GOLD/VND</div>
              <img
                className="custom-img"
                loading="lazy"
                src="https://goldprice.org/charts/silver-price-performance-IRR_x.png?Fri Aug 23 2024 11:05:50 GMT+0000 (Greenwich Mean Time)"
                alt="gold_chart"
              ></img>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Trending;
