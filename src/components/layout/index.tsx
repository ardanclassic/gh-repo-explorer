import React from "react";
import Header from "components/header";
import Footer from "components/footer";
import "./index.scss";

const PageLayout = ({ children }: any) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
