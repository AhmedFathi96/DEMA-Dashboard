
import React from "react";
// react library for routing
import { Route, Switch, Redirect } from "react-router-dom";
// core components
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";

import routes from "../routes";
import ProductForm from "../views/pages/Products/ProductForm";
import CreateProductForm from "../views/pages/Products/CreateProductForm";
import ProductDetails from "../views/pages/Products/ProductDetails";

class Admin extends React.Component {
  state = {
    sidenavOpen: true
  };
  componentDidUpdate(e) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainContent.scrollTop = 0;
    }
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  toggleSidenav = e => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen
    });
  };
  getNavbarTheme = () => {
    return this.props.location.pathname.indexOf(
      "/alternative-dashboard"
    ) === -1
      ? "dark"
      : "light";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
          logo={{
            innerLink: "/",
            imgSrc: require("../assets/img/11af7986-2f32-44f5-84c2-38664438d6cb.jpg"),
            imgAlt: "..."
          }}a
        />
        <div
          className="main-content"
          ref="mainContent"
          onClick={this.closeSidenav}
        >
          {/* <AdminNavbar
            {...this.props}
            theme={this.getNavbarTheme()}
            toggleSidenav={this.toggleSidenav}
            sidenavOpen={this.state.sidenavOpen}
            brandText={this.getBrandText(this.props.location.pathname)}
          /> */}
          <Switch>
            {this.getRoutes(routes)}
            <Route
              path="/Product/view-product"
              component={ProductDetails}
            />
            <Route
              path="/Product/edit-product"
              component={ProductForm}
            />
            <Route
              path="/Product/create-product"
              component={CreateProductForm}
            />
            <Redirect from="*" to="/" />
          </Switch>
          <AdminFooter />
        </div>
        {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
        ) : null}
      </>
    );
  }
}

export default Admin;
