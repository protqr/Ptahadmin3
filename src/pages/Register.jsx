import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo } from "../assets/components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <div className="form-row"></div>
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input type="text" id="name" name="name" 
        className="form-input" defaultValue="" required/>

        <button type="submit" className="btn btn-block">
          submit
        </button>

        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;