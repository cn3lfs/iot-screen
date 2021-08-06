import moment from "dayjs";

export const formatDateCn = (time) => {
  if (!time) return "";
  return moment(time).format("YYYY年MM月DD日");
};
export const formatDate = (time) => {
  if (!time) return "";
  return moment(time).format("YYYY-MM-DD");
};

export const formatDateTime = (time) => {
  if (!time) return "";
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
};

export const formatMonthDay = (time) => {
  if (!time) return "";
  return moment(time).format("MM/DD");
};

export const formatDateTimeDetail = (time) => {
  if (!time) return "";
  return moment(time).format("YYYY-MM-DD dddd HH:mm:ss");
};

// 生成区间内的随机数
export const generateQty = (base = 100, diff = 1000) => {
  return Math.floor(Math.random() * diff + base);
};

// 从数组中随机获取一个元素
export const randomPick = (array: any[]) => {
  const randomElement = array[Math.floor(Math.random() * array.length)];
  return randomElement;
};

// cb为生成每个元素的方法
export const FakeFactory = (cb: Function) => {
  const fn = (n = 10) => {
    const arr: any[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(cb(i));
    }
    return arr;
  };

  return fn;
};
