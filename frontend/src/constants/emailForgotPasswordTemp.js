import moment from "moment";

export let emailForgotPasswordTemp = (dataSendEmail) => {
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
    <p>Chào ${dataSendEmail?.name}.</p>
    <p>Đây là mã thay đổi mật khẩu của bạn, mã này có hiệu lực trong vòng 24h. Bạn không nên chia sẻ mã này ra bên ngoài</p>
    <p>Mã của bạn là: ${dataSendEmail?.token}</p>
    <i style="font-size: 16px">Cảm ơn quý khách hàng đã tin tưởng sản phẩm của chúng tôi.</i>
  <p style="margin:0">  <i style="width: 100%">Mọi thông tin xin liên hệ: </i></p>
  <p style="margin:0">  <i style="width: 100%">- Đường dây miễn phí: 18002086</i></p>
  <p style="margin:0">  <i style="width: 100%">- Trang chủ cửa hàng: http://localhost:3000/</i></p>

  </div>
  </body>
  </html>
  `;
};
