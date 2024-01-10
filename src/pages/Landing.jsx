import React from "react";
import styled from "styled-components";
import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src="{logo}" alt="PTAH" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            <span>PTAH</span> Application
          </h1>
          <Link to="/register" className="btn register-link">
            Register
          </Link>

          <Link to="/login" className="btn ">
            Login
          </Link>
        </div>
        <img src="{main}" alt="PtahApp" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
