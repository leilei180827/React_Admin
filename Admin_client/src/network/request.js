import axios from "axios";
export function request(option) {
  const instance = axios.create({
    timeout: 10000,
  });

  //  intercept axios request in order to apply rules like token/loading icon for requests
  //  config is the whole info of one request
  //  must return otherwise will end this request
  // instance.interceptors.request.use(
  //   (config) => {
  //     return config;
  //   },
  //   (err) => {
  //     return err;
  //   }
  // );
  // instance.interceptors.response.use(
  //   (response) => {
  //     return response.data;
  //   },
  //   (err) => {
  //     if (err && err.response) {
  //       switch (err.response.status) {
  //         case 400:
  //           err.message = "wrong request";
  //           break;
  //         case 401:
  //           err.message = "unauthorized";
  //           break;
  //       }
  //     }
  //     return err;
  //   }
  // );
  return instance(option);
}
