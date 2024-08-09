import React from "react";
import "./Cow.css";

const Cow = ({averagePriceVND}) => {
  console.log('day ne',averagePriceVND);
  return (
    // <!-- ========== Cow card start  ========== -->
    <div class="cowcard">
      <div class="cowcard__content">
        <h2>How it works</h2>
        <p>The formula to calculate the value of 1 COW is:</p>
        <p className="text-center font-mono text-[25px]">
          (
          <span className="math">
            V<sub>1</sub>
          </span>{" "}
          +{" "}
          <span className="math">
            V<sub>2</sub>
          </span>{" "}
          + ... +{" "}
          <span className="math">
            V<sub>158</sub>
          </span>
          ) / 158 <br></br>
          <span className="" >{averagePriceVND} VND = 1 COW </span>
        </p>
        <p>
          Where:
          <ul>
            <li>
              V<sub>i</sub> is the value of the i-th currency converted to VND.
            </li>
            <li>152 is the total number of currencies.</li>
          </ul>
        </p>
        <p>
          With the linkage from countries and finance, we believe COW will be
          the most stable and inflation-proof currency in the world. To destroy
          COW, one would have to collapse the finances of all the world s
          currencies.
        </p>
      </div>
    </div>
  );
};

export default Cow;
