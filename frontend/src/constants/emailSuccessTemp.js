import moment from "moment";

export let emailSuccessTemp = (dataShow) => {
  return `
      <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: #f5f5f5;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          margin-top: 50px;
             border: 1px solid rgb(238, 162, 31);
        }
       #topTitle{
        width: 100%;
        display: flex;
          margin: auto;

        justify-content: center !important;
        align-items: center !important;
    }
    #logoImg{
           width: 100%;
          margin: auto;

        display: flex;
        justify-content: center !important;
        align-items: center !important;
    }
        .logo {
            display: flex;
          justify-content: center;
          max-width: 200px;
          margin: auto;
          margin-bottom: 20px;
        }

        h1 {
          width: 100%;
          display: flex;
          justify-content: center;
          font-size: 24px;
          color: #000000;
          margin-top: 0;
        }

        p {
          font-size: 16px;
          color: #000000;
        }

        .success-icon {
          font-size: 48px;
          color: #4caf50;
          margin-bottom: 20px;
        }

        .order-table {
          width: 100%;
          margin-top: 20px;
          border-collapse: collapse;
        }

        .order-table th,
        .order-table td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;

        }
  #quantity{
     text-align: center;
  }
        .order-table th {
          background-color: #f2f2f2;
           text-align: center;
        }

        .total-price {
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
    <div id="topTitle" style="flex-wrap: wrap; justify-content: center">
       <div id="logoImg">
        <img
          class="logo"
          src="https://bizweb.dktcdn.net/100/438/408/themes/904142/assets/checkout_logo.png?1683881952485"
          alt="Your Logo"
        ></div>

    </div>
    <p>Chào ${dataShow?.name}.</p>
    <div style="display: flex"><p style="color: rgb(238, 162, 31); margin: 0; margin-right: 4px">Yody</p>
     <p style="margin: 0">cảm ơn bạn đã đặt hàng.</p>
  </div>
    <p>Chúng tôi đã nhận được yêu cầu đặt hàng của bạn. Chi tiết ở bên dưới:</p>
     <div style="display: flex">
          <p style="margin: 0">Mã đơn hàng:</p>
          <p style="color: rgb(238, 162, 31); margin: 0; margin-left: 4px; margin-right: 4px"> ${
            dataShow?.idOrder
          } </p>
          <p style="margin: 0">(Ngày đặt: ${moment(dataShow?.createdAt).format(
            "DD/MM/YYYY HH:mm"
          )})</p>
    </div>
       <div style="display: flex">
          <p style="">Trạng thái đơn hàng:</p>
          <p style="color: rgb(238, 162, 31);  margin-left: 4px"> ${
            dataShow?.statusOrder
          } </p>
    </div>

    <p style="margin: 0">Chi tiết đơn hàng:</p>
    <table class="order-table">
     <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Tổng</th>
        </tr>
      </thead>
      <tbody>
        ${dataShow?.orderDetails
          ?.map(
            (item) =>
              `<tr>
                <td>${item.name}</td>
                <td id="quantity">${item.quantity}</td>
                <td>${item.price?.toLocaleString()}đ</td>
                <td>${(item.quantity * item.price)?.toLocaleString()}đ</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <p class="order-letter">Phí vận chuyển: ${dataShow?.costShip?.toLocaleString()}đ</p>
    <div class="order-letter" style="display: flex"><p>Tổng giá trị đơn hàng:</p> <p style="color:rgb(238, 162, 31); margin-left: 4px; "> ${(
      dataShow?.totalPrice + dataShow?.costShip
    ).toLocaleString()}đ</p></div>
    <p class="">Phương thức thanh toán: ${
      dataShow?.paymentMethod === "COD"
        ? "Tiền mặt"
        : "Thanh toán online (VN pay)"
    }</p>
  <p class="">Tình trạng thanh toán:    ${
    dataShow?.vnp_ResponseCode === "00" && dataShow?.paymentMethod === "VN pay"
      ? "Đã thanh toán"
      : dataShow?.paymentMethod === "COD"
      ? "Thanh toán khi nhận hàng"
      : ""
  }</p>
    <i style="font-size: 16px">Cảm ơn quý khách hàng đã tin tưởng và đặt hàng sản phẩm của chúng tôi.</i>
   <p style="margin:0"> <i style="width: 100% ">Xem lịch sử mua hàng tại: http://localhost:3000/account/orders </i></p>
  <p style="margin:0">  <i style="width: 100%">Mọi thông tin xin liên hệ: </i></p>
  <p style="margin:0">  <i style="width: 100%">- Đường dây miễn phí: 18002086</i></p>
  <p style="margin:0">  <i style="width: 100%">- Trang chủ cửa hàng: http://localhost:3000/</i></p>

  </div>
  </body>
  </html>
  `;
};
