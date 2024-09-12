import React, { useState, useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "./../../context/AuthContext";
import logo from "../../assets/images/logocow.png";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "EN", flag: "gbp" },
  { code: "vi", lang: "VN", flag: "vnd" },
];

// nav links
// const nav__links = [
//   {
//     path: "/home",
//     display: "Home",
//   },
//   {
//     path: "/market",
//     display: "Market",
//   },
// ];

// header
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    if (headerRef.current) {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    }
  };

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getFlag = (language) => {
    switch (language) {
      case 'en':
        return 'gbp';
      case 'vi':
        return 'vnd';
      default:
        return 'gbp';
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);

    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("show__menu");
    }
  };

  const { t } = useTranslation();

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            {/* <!-- ========== Start Logo Section ========== -->*/}

            <div className="logo header-title">
              <Link to="/" className="logo-link">
                <img src={logo} alt="logo" className="logo-image" />
                <span className="logo-text">COW</span>
              </Link>
            </div>

            {/* <!-- ========== End Logo Section ========== --> */}

            {/* <!-- ========== Start Menu Section ========== --> */}

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
               <ul className="navbar">
              {/* {
                nav__links.map((item, index) => {
                  return (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className= 
                    { navClass => navClass.isActive ? "active__link" : '' }>
                      {item.display}</NavLink>
                  </li>
                  )
                })
              } */}
            </ul> 
            </div>

            {/* <!-- ========== End Menu Section ========== --> */}

            <div className="information">
              {user ? (
                <>
                  <h5 className="mb-0">{user.username}</h5>
                  <Button
                    className="btn btn-logout"
                    style={{ background: "orange", border: "none" }}
                    onClick={logout}
                  >
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button className="btn secondary__btn">
                    <Link to="/login">{t("login")}</Link>
                  </Button>

                  <Button className="btn primary__btn">
                    <Link to="/register">{t("register")}</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div className="currency-selector">
            <div className="icon" onClick={handleDropdownToggle}>
              {i18n.language && (
                <img
                  src={`https://www.xe.com/svgs/flags/${getFlag(i18n.language)}.static.svg`}
                  alt={`${getFlag(i18n.language)} icon`}
                />
              )}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu-custom">
                {languages.map((lg) => (
                  <div
                    key={lg.flag}
                    className="dropdown-item-custom"
                    onClick={() => changeLanguage(lg.code)}
                  >
                    <img
                      src={`https://www.xe.com/svgs/flags/${lg.flag}.static.svg`}
                      alt={`${lg.flag} icon`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

            {/* <select className="language__selector"
              defaultValue={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              {languages.map((language) => (
                <option
                  key={language.code}
                  value={language.code}
                  className={`fi fi-${language.flag}`}
                >
                  {language.lang}
                </option>
              ))}
            </select> */}
            {/* Mobile menu */}
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
