import axios from "axios";
export function request(option) {
  const instance = axios.create({
    timeout: 10000,
    // headers: {
    //   "Content-Type": "application/json",
    // },
    baseURL: "/api",
  });

  //  intercept axios request in order to apply rules like token/loading icon for requests
  //  config is the whole info of one request
  //  must return otherwise will end this request
  instance.interceptors.request.use(
    (config) => {
      if (localStorage.getItem("user_info")) {
        let storage = JSON.parse(localStorage.getItem("user_info"));
        config.headers.Authorization =
          storage.user && storage.user.token ? storage.user.token : "";
      }
      return config;
    },
    (err) => {
      return err;
    }
  );
  // instance.interceptors.request.use(function (config) {
  //   const token = localStorage.getItem('token');
  //   config.headers.Authorization =  token ? `Bearer ${token}` : '';
  //   return config;
  // });
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

// // Default config options
// const defaultOptions = {
//   baseURL: <CHANGE-TO-URL>,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

// // Create instance
// let instance = axios.create(defaultOptions);

// // Set the AUTH token for any request
// instance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization =  token ? `Bearer ${token}` : '';
//   return config;
// });
