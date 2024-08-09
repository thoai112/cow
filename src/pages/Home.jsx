import React from "react";
import "../style/home.css";
import { Container, Row, Col, Card } from "reactstrap";
import Subtitle from "../shared/Subtitle";
import FeaturedTourList from "../components/Featured-tour/FeaturedTourList";
import experienceImg from "../assets/images/experience.png";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonial from "../components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";
import logo from "../assets/images/logocow.png";
import Currency from "../components/Currency/Currency";
import Cow from "../shared/Cow";

//home component

const Home = () => {
  return (
    <>
      {/* <!-- ========== Welcome section start  ========== --> */}
      <section className="bg-welcome-color">
        <Container>
          <Row>
            <div className="welcome__content">
              <img className="animate-jump" src={logo} alt="" />
              <h1>Welcome to COW</h1>
              <p>
                where you can buy and sell, monitor the market or simply follow
                economic news...
              </p>
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
                <p>
                  Cow (Coin Of World) được tạo ra bởi 1 thuật toán đơn giản nhất
                  đó là Trung bình cộng.
                </p>
                <p>
                  Chúng tôi đã liệt kê tất cả các đồng tiền tệ từ các quốc gia
                  và vùng lãnh thổ đang được lưu hành trên toàn thế giới và được
                  công nhận bởi quốc tế (ISO 4217).
                </p>
                <p>
                  Theo thống kê của chúng tôi bao gồm 152 đòng tiền đang được
                  lưu hành, tất cả đều được quy đổi giá trị ra tiền Việt Nam
                  Đồng (VND). Chúng tôi cộng giá trị tất cả các loại tiền tệ
                  theo giá trị VND và chia đều để tìm ra giá trị trung bình = 1
                  COW.
                </p>
                <p>
                  Với sự liên kết từ các quốc gia và tài chính. Tôi tin tưởng
                  COW sẽ là đồng tiền không bị lạm phát và ổn định nhất thế
                  giới. Để huỷ hoại COW, các bạn phải làm sụp đổ tài chính của
                  tiền tệ tất cả các quốc gia.
                </p>
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
 
      <Currency />
   
      {/* <section className="table">
        <Container>
          <Row>
            <Col lg="6">
              <Cow />
            </Col>

          </Row>
        </Container>
      </section>  */}

      {/* <!-- ========== table section end   ========== --> */}

      {/* <!-- ==========  Experience section Start   ========== --> */}

      {/* <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />

                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  {" "}
                  traveling around from place to place. a long journey including
                  the visiting
                  <br />
                  of a number of places in sequence, especially with an
                  organized group led by a guide.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>

                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>

                <div className="counter__box">
                  <span>15</span>
                  <h6>Year Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="exp" />
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* <!-- ==========  Experience section end   ========== --> */}

      {/* <!-- ==========  Gallery section start   ========== --> */}

      {/* <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers tour gallery{" "}
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* <!-- ==========  Gallery section end   ========== --> */}

      {/* <!-- ==========  testimonial section start   ========== --> */}

      <section className="cow__notify">
        <Container>
          <Row>
            <div className="cow__notify-content">
              <h2 >Thanks You</h2>
            </div>
          </Row>
        </Container>
      </section>

      {/* <!-- ==========  testimonial section end   ========== --> */}
      {/* <Newsletter /> */}
    </>
  );
};

export default Home;
