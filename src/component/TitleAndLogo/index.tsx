import { useState } from "react";
import { useInterval } from "react-use";
import { formatDateTimeDetail } from "@/util";

import "./index.scss";
import WrapperDiv from "../WrapperDiv";

function TitleAndLogo(props) {
  const [time, setTime] = useState(Date.now());

  useInterval(() => {
    setTime(Date.now());
  }, 1000);

  return (
    <WrapperDiv {...props}>
      <div className="title-and-logo">
        <div className="logo">
          <img
            className="logo-img"
            src={process.env.PUBLIC_URL + "/标题头.png"}
            alt=""
            srcSet=""
            width="100%"
          />
        </div>
        <div className="title text-center">车间大屏</div>
        <div className="time">{formatDateTimeDetail(time)}</div>
      </div>
    </WrapperDiv>
  );
}

export default TitleAndLogo;
