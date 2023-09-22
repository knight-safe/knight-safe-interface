import React from "react";
import { styled } from "styled-components";
import { FiExternalLink, FiCopy } from "react-icons/fi";
import { maxDesktop } from "../constant/bp";

const TokenListName = ({ img, title, shortName, link }) => {
  return (
    <StyleLayer>
      <img src={img} alt={title} />
      <div className="token-text">
        <span className="tl-title">{title}</span>
        <span className="tl-shortName">{shortName}</span>
        <a href={link} target="_blank" rel="noreferrer">
          <FiExternalLink />
        </a>
      </div>
    </StyleLayer>
  );
};

export default TokenListName;

const StyleLayer = styled.div`
  display: flex;
  align-items: center;
  .token-text {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  img {
    width: 35px;
    margin-right: 10px;
  }
  .tl-title {
    font-weight: 600;
    display: inline-flex;
    margin-right: 10px;
    @media ${maxDesktop} {
      width: 100%;
    }
  }
  .tl-shortName {
    color: #bcaef4;
    display: inline-flex;
    margin-right: 10px;
  }
  a {
    color: #bcaef4;
    display: inline-flex;
  }
`;
