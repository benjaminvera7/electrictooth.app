import React from "react";
import Icon from "../Icon";

const Bolt = props => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <polygon id="Shape" fill={props.active ? "#2a69ac" : "#b3b3b3"} points="7 2 7 13 10 13 10 22 17 10 13 10 17 2"></polygon>
    </svg>
  </Icon>
);

export default Bolt;