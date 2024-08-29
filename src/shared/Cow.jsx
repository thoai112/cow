import "./Cow.css";

const Cow = ({ averagePriceVND }) => {

  return (
    // <!-- ========== Cow card start  ========== -->
    <div className="cowcard">
      <div className="cowcard__content">
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
          <span className="">{averagePriceVND} VND = 1 COW </span>
        </p>
      </div>
    </div>
  );
};

export default Cow;