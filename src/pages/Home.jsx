import { useState, useEffect } from "react"; // Added missing imports
import { useNavigate } from "react-router-dom"; // Added missing imports
import "../style/home.css";
import { Container, Row, Col } from "reactstrap";
import logo from "../assets/images/logocow.png";
import Cow from "../shared/Cow";
import Table from "../shared/Table";
import { Trans, useTranslation } from "react-i18next";

//home component
const Home = () => {
  const { t } = useTranslation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isShowCow, setIsCowVisible] = useState(false);
  const [averagePriceVND, setAveragePriceVND] = useState("");
  const navigate = useNavigate();

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      navigate("/home");
    }
  };

  const handlePopupToggle = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleAveragePriceChange = (averagePrice) => {
    setAveragePriceVND(averagePrice);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currencySection = document.querySelector(".currency");
      const popup = document.querySelector(".notify__content");
      if (currencySection) {
        const rect = currencySection.getBoundingClientRect();
        // const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
        const isVisible = rect.bottom <= window.innerHeight;
        setIsCowVisible(isVisible);
      }

      if (popup) {
        const rect = currencySection.getBoundingClientRect();
        const isVisible = rect.bottom <= window.innerHeight;
        setIsPopupVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <!-- ========== Welcome section start  ========== --> */}
      <section className="bg-welcome-color">
        <Container>
          <Row>
            <div className="welcome__content">
              <img className="animate-jump" src={logo} alt="" />
              <h1>{t("welcome")}</h1>
              <p>{t("welcome_content")}</p>
            </div>
          </Row>
        </Container>
      </section>
      {/* <!-- ========== End Welcome section  ========== --> */}

      {/* <!-- ========== Descript section start  ========== --> */}

      <section className="description">
        <Container>
          <Row>
            <Col lg="6">
              <div className="description__content">
                <h1>WHAT IS COW?</h1>
                <p>{t("description_cow.line1")}</p>
                <p>{t("description_cow.line2")}</p>
                <p>{t("description_cow.line3")}</p>
                <p>{t("description_cow.line4")}</p>
              </div>
            </Col>
            <Col lg="6">
              <div className="description__img">
                <img className="rotateY-animation" src={logo} alt="new" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <!-- ========== Description section end  ========== --> */}

      {/* <!-- ========== Table section start   ========== --> */}

      {/* <Currency /> */}

      <section className="currency">
        <Container>
          <Row>
            <Col lg="7">
              <Table onAveragePriceChange={handleAveragePriceChange} />
            </Col>
            {isShowCow && (
              <div className="currency-cow">
                <Col lg="3">
                  <Cow averagePriceVND={averagePriceVND} />
                </Col>
              </div>
            )}
          </Row>
        </Container>
      </section>

      {/* <!-- ========== table section end   ========== --> */}

      {/* <!-- ==========  testimonial section start   ========== --> */}

      <section className="cow__notify">
        <Container>
          <Row>
            <div className="cow__notify-row animate-jump">
              <img src={logo} alt="cow" onClick={handlePopupToggle} />
              <div className="cow__notify-content">
                <h2 onClick={handlePopupToggle}>Go to Home</h2>
              </div>
            </div>
            <div className="notify__content">
              <p>{t("notify_cow.line1")}</p>
              <p>{t("notify_cow.line2")}</p>
              <p>{t("notify_cow.line3")}</p>
            </div>
          </Row>
        </Container>
        {isPopupVisible && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={handlePopupToggle}>
                &times;
              </span>
              <h1>{t("popup.title")}</h1>
              <div className="popup-container">
                <p>{t("popup.line1")}</p>
                <p>{t("popup.line2")}</p>
                <p>{t("popup.line3")}</p>
                <p>{t("popup.line4")}</p>
              </div>
              <div class="checkboxes__item">
                <label class="checkbox style-cb">
                  <input type="checkbox" onChange={handleCheckboxChange} />
                  <div class="checkbox__checkmark"></div>
                  <div class="checkbox__body">{t("popup.line5")}</div>
                </label>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* <!-- ==========  testimonial section end   ========== --> */}
    </>
  );
};

export default Home;
