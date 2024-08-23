import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import  {store} from './app/store';
import { AuthContextProvider } from "./context/AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./i18n/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);