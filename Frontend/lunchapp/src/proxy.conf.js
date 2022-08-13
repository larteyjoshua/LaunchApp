// {
//   "/": {
//     "target":  {
//       "host": "localhost",
//       "protocol": "http:",
//       "port": 8000
//     },
//     "secure": false,
//     "changeOrigin": true,
//     "logLevel": "info",
//     "bypass": true
//  }
// }

const PROXY_CONFIG = {
  "/": {
      "target": "http://localhost:8000",
      "secure": false,
      "bypass": function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf("html") !== -1) {
              console.log("Skipping proxy for browser request.");
              return "/index.html";
          }
      }
  }
}

module.exports = PROXY_CONFIG;
