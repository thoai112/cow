import "./Cow.css";
import { useTranslation } from "react-i18next";

const Cow = ({ averagePriceVND }) => {
  const { t } = useTranslation();
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
          ) / 158 <br></br>
          <span>{averagePriceVND} VND = 1 COW </span>
        </p>
      </div>
    </div>
  );
};

export default Cow;
