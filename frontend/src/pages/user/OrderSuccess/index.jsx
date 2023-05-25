import { useEffect, useState } from "react";
import { generatePath, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../../constants/routes";
import axios from "axios";
import qs from "qs";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function OrderSuccess() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const [dataIdOrders, setDataIdOrders] = useState([]);

  const query = qs.parse(search, { ignoreQueryPrefix: true });

  let id = dataIdOrders?.id;
  let ResultPayment = {
    vnp_ResponseCode: query.vnp_ResponseCode,
    vnp_TransactionStatus: query.vnp_TransactionStatus,
  };
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 44, color: "#eeb50d" }} spin />
  );
  useEffect(() => {
    if (userInfo.data.id) {
      console.log("dang nap 1");

      axios
        .get("http://localhost:4000/orders?", {
          params: {
            idOrder: query.vnp_TxnRef,
          },
        })

        .then((res) => {
          setDataIdOrders(res.data[0]);
          axios
            .patch(`http://localhost:4000/orders/${id}`, ResultPayment)

            .then((res) => {
              window.location.replace(
                `http://localhost:3000/checkout/thankyou/${query.vnp_TxnRef}`
              );
            });
        })
        .catch((err) => {
          console.log("loi roi");
        });
    } else {
      console.log("dang xuat 1");
      axios
        .get("http://localhost:4000/guestOrders?", {
          params: {
            idOrder: query.vnp_TxnRef,
          },
        })

        .then((res) => {
          setDataIdOrders(res.data[0]);
          axios
            .patch(`http://localhost:4000/guestOrders/${id}`, ResultPayment)
            .then((res) => {
              navigate({
                pathname: generatePath(ROUTES.USER.THANKYOU, {
                  id: query.vnp_TxnRef,
                }),
              });
            });
        })
        .catch((err) => {
          console.log("loi roi");
        });
    }
  }, [userInfo.data.id, id]);

  return (
    <div className="w-full h-[100vh] flex justify-content-center align-items-center ">
      <Spin indicator={antIcon} className="w-full" />
    </div>
  );
}
export default OrderSuccess;
