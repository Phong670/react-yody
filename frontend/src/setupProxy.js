const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
      changeOrigin: true,
    })
  );
};
