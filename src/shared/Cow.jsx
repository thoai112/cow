import React, { useState, useEffect } from "react";
import "./Cow.css";
import { priceConvert } from "../utils/logicHandle";
import { formatNumber } from "../utils/formatDate";
import { useTranslation } from "react-i18next";
import useConverterFetch from "../hooks/useConverterFetch";

const Cow = ({ averagePriceVND }) => {
  const { t } = useTranslation();
  const [selectedConvertTo, setSelectedConvertTo] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [listCountry, setListCountry] = useState([]);
  const [price, setPrice] = useState("");

  const { data: liveConverter, converterLoading } = useConverterFetch();

  useEffect(() => {
    if (!converterLoading && liveConverter?.rates) {
      setSelectedConvertTo(Object.keys(liveConverter?.rates)[0]);
      setListCountry(liveConverter?.rates);
      setPrice(formatNumber(liveConverter?.rates[Object.keys(liveConverter?.rates)[0]]));
    }
  }, [liveConverter, converterLoading]);


  const handleConvertTo = (code) => {
    setSelectedConvertTo(code);
    setIsDropdownOpen(false);
    setPrice(formatNumber(liveConverter?.rates[code]));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    // <!-- ========== Cow card start  ========== -->
    <div className="cowcard">
      <div className="cowcard__content">
        <h2>{t("cowcard.title")}</h2>
        <p> {t("cowcard.formula")}</p>
        <p>
          (
          <span>
            V<sub>1</sub>
          </span>
          +
          <span>
            V<sub>2</sub>
          </span>
          + ... +
          <span>
            V<sub>158</sub>
          </span>
          ) / 158
        </p>
        <span className="cow-row">
          {averagePriceVND} VND = 1 COW  
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 17"
            aria-hidden="true"
            className="custom-convert"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11.726 1.273l2.387 2.394H.667V5h13.446l-2.386 2.393.94.94 4-4-4-4-.94.94zM.666 12.333l4 4 .94-.94L3.22 13h13.447v-1.333H3.22l2.386-2.394-.94-.94-4 4z"
              clipRule="evenodd"
            ></path>
          </svg>
          {price}
          <div className="currency-selector">
            <div className="icon" onClick={handleDropdownToggle}>
              {selectedConvertTo && (
                <img
                  src={`https://www.xe.com/svgs/flags/${selectedConvertTo.toLowerCase()}.static.svg`}
                  alt={`${selectedConvertTo.toLowerCase()} icon`}
                />
              )}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu-custom">
                {Object.keys(listCountry).map((currency) => (
                  <div
                    key={currency}
                    className="dropdown-item-custom"
                    onClick={() => handleConvertTo(currency)}
                  >
                    <img
                      src={`https://www.xe.com/svgs/flags/${currency.toLowerCase()}.static.svg`}
                      alt={`${currency.toLowerCase()} icon`}
                    />
                    {/* {currency} */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </span>
      </div>
    </div>
  );
};

export default Cow;




