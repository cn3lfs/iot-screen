import "./index.scss";
import LongBox from "@/component/LongBox";
import { useState, useEffect, useRef } from "react";
import { generateQty, randomPick, FakeFactory } from "@/util";
import { useInterval } from "react-use";
import { throttle } from "lodash";
import ReactECharts from "echarts-for-react";
import { toFloat } from "@/util/number";
import { Table } from "antd";

function DeviceStatus(props) {
  const statusMap = {
    normal: "正常",
    warning: "警告",
    danger: "故障",
  };
  const generateFakeData = FakeFactory((i) => {
    return {
      id: i,
      equipmentNo: "DEV1111" + String(i).padStart(3, "0"),
      locationNo: "1101-" + String(i).padStart(3, "0"),
      status: randomPick(Object.keys(statusMap)),
    };
  });
  const generateFakeStation = FakeFactory((i) => {
    return {
      id: i,
      stationNo: "ST1111" + String(i).padStart(3, "0"),
      status: randomPick(Object.keys(statusMap)),
    };
  });

  const [dataSource, setDataSource] = useState([...generateFakeData(68)]);

  const getLineImg = (status: string) => {
    if (status === "normal")
      return process.env.PUBLIC_URL + "/hyphen-normal.png";
    if (status === "warning")
      return process.env.PUBLIC_URL + "/hyphen-warning.png";
    if (status === "danger")
      return process.env.PUBLIC_URL + "/hyphen-danger.png";
    return "";
  };

  const columns = [
    {
      title: "设备编号",
      dataIndex: "equipmentNo",
      key: "equipmentNo",
    },
    {
      title: "设备位置",
      dataIndex: "locationNo",
      key: "locationNo",
    },
    {
      title: "设备状态",
      dataIndex: "status",
      key: "status",
      render(text, record, index) {
        return (
          <div className={`indicator-item-${record.status}`}>
            <img
              className="line-status-logo"
              src={getLineImg(record.status)}
              alt=""
              srcSet=""
            />
            <span className="ms-2">{statusMap[record.status]}</span>
          </div>
        );
      },
    },
  ];

  const generateIndicatorList = () => {
    const indicatorList = [
      {
        status: "normal",
        statusName: "正常",
        deviceQty: generateQty(10, 100),
        percent: 0,
      },
      {
        status: "warning",
        statusName: "警告",
        deviceQty: generateQty(10, 100),
        percent: 0,
      },
      {
        status: "danger",
        statusName: "故障",
        deviceQty: generateQty(10, 100),
        percent: 0,
      },
    ];

    const sum = indicatorList.reduce((prev, next) => prev + next.deviceQty, 0);

    for (let i = 0; i < indicatorList.length; i++) {
      const item = indicatorList[i];
      item.percent = toFloat(((item.deviceQty * 100) / sum).toFixed(2));
    }

    return indicatorList;
  };

  const indicatorList = generateIndicatorList();

  const [statusList, setStatusList] = useState([...indicatorList]);

  const [option, setOption] = useState({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      show: false,
    },
    color: ["#38c7ff", "#ffe400", "#ff5454"],
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["60%", "100%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "16",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: indicatorList.map((item) => ({
          name: item.statusName,
          value: item.deviceQty,
        })),
      },
    ],
  });
  const myRef = useRef(null);

  const [stationList, setStationList] = useState([...generateFakeStation(200)]);

  const scrollTable = () => {
    // 动画效果

    setDataSource((prevState) => {
      const arrCopy = [...prevState];
      const arrFirst = arrCopy.splice(0, 1);
      const arr = arrCopy.concat(arrFirst);

      return arr;
    });
  };

  useInterval(scrollTable, 2000);

  const fetchData = () => {
    // getInListAccessory().then((res) => {
    //   setDataSource(res.data);
    // });
  };

  const throttleFetch = throttle(fetchData, 120 * 1000);

  useInterval(throttleFetch, 120 * 1000);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LongBox title="设备状态">
      <div className="device-status">
        <div className="device-chart">
          <div className="device-circle">
            <ReactECharts
              ref={myRef}
              option={option}
              style={{ height: 150, width: 150 }}
            />
          </div>
          <div className="device-indicator">
            {statusList.map((item, index) => (
              <div
                className={`indicator-item indicator-item-${item.status}`}
                key={index}
              >
                <div className="status-text">{item.statusName}</div>
                <div className="status-number">{item.deviceQty}</div>
                <div className="status-percent">{item.percent}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="device-diagram">
          <div className="device">
            <div className="device-title">当前设备数</div>
            <div className="current-device">
              <div className="device-number">{dataSource.length}</div>

              <div className="device-square">
                <img
                  className="line-status-logo"
                  src={process.env.PUBLIC_URL + "/当前设备数.png"}
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
          </div>
          <div className="station">
            <div className="station-title">当前工位数</div>
            <div className="current-station">
              <div className="station-number">{stationList.length}</div>

              <div className="station-square">
                <img
                  className="line-status-logo"
                  src={process.env.PUBLIC_URL + "/当前工位数.png"}
                  alt=""
                  srcSet=""
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="device-table"
          style={{
            position: "relative",
            overflow: "hidden",
            height: 320,
          }}
        >
          <Table
            rowKey="id"
            style={{ width: 580 }}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            size="small"
          />
        </div>
      </div>
    </LongBox>
  );
}

export default DeviceStatus;
