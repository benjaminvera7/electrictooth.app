import React from "react";
import Icon from "../Icon";

const Home = props => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill={props.active ? "#2a69ac" : "#b3b3b3"}
      viewBox="0 0 24 24"
      id="home"
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  </Icon>
);

export default Home;
