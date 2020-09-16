
import React from "react";
import ReactDOM from "react-dom";
// react library for routing

// bootstrap rtl for rtl support page
import "../src/assets/vendor/bootstrap-rtl/bootstrap-rtl.scss";
// plugins styles from node_modules
import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
// plugins styles downloaded
import "../src/assets/vendor/fullcalendar/dist/fullcalendar.min.css";
import "../src/assets/vendor/sweetalert2/dist/sweetalert2.min.css";
import "../src/assets/vendor/select2/dist/css/select2.min.css";
import "../src/assets/vendor/quill/dist/quill.core.css";
import "../src/assets/vendor/nucleo/css/nucleo.css";
import "../src/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "../src/assets/scss/argon-dashboard-pro-react.scss?v1.1.0";
import "../src/assets/style.css";


import { Provider } from 'react-redux';
import persistedStore from "./React-Redux/store";
import App from "./app";


export async function initApp() {
  const { store } = await persistedStore();
  
  
    ReactDOM.render(
      <Provider store={store}>
      <>
        <App />
      </>
      </Provider>,
      document.getElementById("root") as HTMLDivElement
    );
  }
  
  initApp();
  