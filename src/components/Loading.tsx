import React from "react";
import Loader from "../assets/images/loader.gif";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div
      style={{ background: "#093140" }}
      className="vh-100 d-flex align-items-center justiyf-content-center"
    >
      <img src={Loader} className="w-100" alt="" />
    </div>
  );
};

export default Loading;
