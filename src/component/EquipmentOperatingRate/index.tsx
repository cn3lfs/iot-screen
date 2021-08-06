import "./index.scss";
import ShortBox from "@/component/ShortBox";
import { useState, useEffect, useRef } from "react";
import { useInterval } from "react-use";
import { throttle } from "lodash";
import ReactECharts from "echarts-for-react";
import { generateQty, FakeFactory } from "@/util";

function EquipmentOperatingRate(props) {
  const generateFakeData = FakeFactory((i) => {
    return generateQty(10, 50);
  });

  const generateDate = FakeFactory((i) => {
    const base = 9; // 2021/06/01
    return base + i + ":00";
  });

  const [option, setOption] = useState({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: ["计划产量"],
      textStyle: {
        color: "#ccc",
      },
      show: false,
    },
    grid: {
      left: "10%",
      bottom: "10%",
    },
    xAxis: [
      {
        type: "category",
        data: [...generateDate(10)],
        axisPointer: {
          type: "shadow",
        },
        axisLabel: {
          color: "#a2dbfa",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "",
        axisLabel: {
          formatter: "{value}%",
          color: "#a4ecfc",
        },
        splitLine: {
          lineStyle: {
            color: "#a2dbfa",
            opacity: 0.1,
          },
        },
      },
    ],
    series: [
      {
        name: "设备开动率",
        type: "bar",
        barWidth: 20,
        itemStyle: {
          normal: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#6ef3fc", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#030719", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        data: [...generateFakeData(10)],
        label: {
          show: true,
          position: "top",
          color: "#6ef3fc",
          formatter: "{c}%",
        },
      },
    ],
  });

  const myRef = useRef(null);

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
    <ShortBox title="设备开动率">
      <div className="equipment-operating">
        <span className="top-right-title">每小时更新</span>
        <ReactECharts ref={myRef} option={option} style={{ height: 410 }} />
      </div>
    </ShortBox>
  );
}

export default EquipmentOperatingRate;
