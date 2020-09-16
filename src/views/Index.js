
/*eslint-disable*/
import React from "react";

// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import AuthFooter from "../components/Footers/AuthFooter.js";

class Index extends React.Component {
  render() {
    return (
      <>
        <IndexNavbar />

        <AuthFooter />
      </>
    );
  }
}

export default Index;
