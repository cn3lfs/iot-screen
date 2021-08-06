import "./index.scss";
import ShortBox from "@/component/ShortBox";
import { useState, useEffect, useRef } from "react";
import { useInterval } from "react-use";
import { throttle } from "lodash";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { generateQty, FakeFactory, formatMonthDay } from "@/util";

function EquipmentUtilizationRate(props) {
  const generateFakeData = FakeFactory((i) => {
    return generateQty(10, 50);
  });
  const generateDate = FakeFactory((i) => {
    const base = 1622476800000; // 2021/06/01
    return formatMonthDay(base + i * 86400000);
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
        name: "设备使用率",
        type: "line",
        itemStyle: {
          normal: {
            color: "#137dfd",
          },
        },
        smooth: true,
        lineStyle: {
          width: 3,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#137dfd",
            },
            {
              offset: 1,
              color: "rgb(105, 60, 254)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [...generateFakeData(10)],
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
    <ShortBox title="设备使用率">
      <div className="equipment-utilization">
        <span className="top-right-title">每日零点更新</span>
        <ReactECharts ref={myRef} option={option} style={{ height: 410 }} />
      </div>
    </ShortBox>
  );
}

export default EquipmentUtilizationRate;
