import { extend } from "umi-request";

const request = extend({
  prefix:
    process.env.NODE_ENV === "production" ? "" : "http://192.168.100.221:3000",
  timeout: 10 * 1000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("Authorization"),
  },
});

export default request;
