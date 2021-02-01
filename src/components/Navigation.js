import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = ({ userObj }) => (
  <nav>
    <NavList>
      <li>
        <Link to="/" className="nav-home-link">
          <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
        </Link>
      </li>
      <li>
        <Link to="/profile" className="nav-profile-link">
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <User>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}
          </User>
        </Link>
      </li>
    </NavList>
  </nav>
);

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  margin-bottom: 80px;
  .nav-home-link {
    margin-right: 10px;
  }
  .nav-profile-link {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }
`;

const User = styled.span`
  margin-top: 10px;
`;

export default Navigation;
