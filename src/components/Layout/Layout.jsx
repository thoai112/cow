import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Router from '../../router/Router';
import './Layout.css'; // Import the CSS file

const Layout = () => {
  return (
    <div className="layout-container">
      <Header/>
      <div className="contentz">
        <Router/>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout;