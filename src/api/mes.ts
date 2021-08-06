import request from "@/util/request";

export const getActPeriodHistogramLayout = () => {
  return request("/mes/produceSchedule/getActPeriodHistogramLayout", {
    method: "get",
  });
};
export const getTodayInList = () => {
  return request("/mes/orderCropQrStorage/getTodayInList", {
    method: "get",
  });
};
export const getTodayOutList = () => {
  return request("/mes/orderCropQrStorage/getTodayOutList", {
    method: "get",
  });
};
