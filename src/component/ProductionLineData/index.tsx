import "./index.scss";
import LongBox from "@/component/LongBox";
import { useState, useEffect } from "react";
import { generateQty, randomPick, FakeFactory } from "@/util";
import { useInterval } from "react-use";
import { throttle } from "lodash";

function ProductionLineData(props) {
  const statusList = ["normal", "warning", "danger"];

  const generateFakeData = FakeFactory((i) => {
    return {
      lineName: "11" + String(i).padStart(2, "0"),
      status: randomPick(statusList),
      deviceQty: generateQty(10, 100),
    };
  });

  const [lineList, setLineList] = useState([...generateFakeData(20)]);

  const getLineImg = (status: string) => {
    if (status === "normal") return process.env.PUBLIC_URL + "/正常.png";
    if (status === "warning") return process.env.PUBLIC_URL + "/警告.png";
    if (status === "danger") return process.env.PUBLIC_URL + "/危险.png";
    return "";
  };

  const fetchData = () => {
    // getInListAccessory().then((res) => {
    //   setDataSource(res.data);
    // });
  };

  const throttleFetch = throttle(fetchData, 120 * 1000);

  const scrollTable = () => {
    // 动画效果

    setLineList((prevState) => {
      const arrCopy = [...prevState];
      const arrFirst = arrCopy.splice(0, 1);
      const arr = arrCopy.concat(arrFirst);

      return arr;
    });
  };

  useInterval(scrollTable, 2000);
  useInterval(throttleFetch, 120 * 1000);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LongBox title="产线数据">
      <div className="production-line">
        <div className="line-data">
          <img
            className="line-circle"
            src={process.env.PUBLIC_URL + "/圆.png"}
            alt=""
            srcSet=""
          />
          <div className="line-circle-text">
            <div className="line-number">{lineList.length}</div>
            <div className="line-text">产线数量</div>
          </div>
        </div>
        <div className="line-and-device">
          <div className="line">
            <div className="line-title">产线</div>
            <div className="line-list">
              {lineList.map((item, index) => (
                <div className="line-list-item" key={index}>
                  <img
                    className="line-status-logo"
                    src={getLineImg(item.status)}
                    alt=""
                    srcSet=""
                  />
                  <span className="line-item-text ms-3">{item.lineName}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="device">
            <div className="device-title">当前工作设备</div>
            <div className="device-list">
              {lineList.map((item, index) => (
                <div className="device-list-item" key={index}>
                  <img
                    className="device-status-logo"
                    src={process.env.PUBLIC_URL + "/设备.png"}
                    alt=""
                    srcSet=""
                  />
                  <span className="device-item-text ms-3">
                    {item.deviceQty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LongBox>
  );
}

export default ProductionLineData;
