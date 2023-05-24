import { useEffect, useState, useMemo } from "react";
import { Link, generatePath, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";
import { ROUTES } from "../../../constants/routes";
import axios from "axios";
import qs from "qs";
import { emailSuccessTemp } from "../../../constants/emailSuccessTemp";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function OrderSuccess() {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 44, color: "#eeb50d" }} spin />
  );
  const { search } = useLocation();
  const { idOrderProductList } = useSelector((state) => state.order);
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  console.log("🚀 ~ file: index.jsx:16 ~ ThankyouOrdered ~ query:", query);
  const { userInfo } = useSelector((state) => state.auth);
  console.log(
    "🚀 ~ file: index.jsx:18 ~ ThankyouOrdered ~ userInfo:",
    userInfo
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataShow, setDataShow] = useState([]);
  const [dataIdOrders, setDataIdOrders] = useState([]);
  console.log(
    "🚀 ~ file: index.jsx:28 ~ ThankyouOrdered ~ dataIdOrders:",
    dataIdOrders
  );
  let id = dataIdOrders?.id;
  console.log("🚀 ~ file: index.jsx:33 ~ ThankyouOrdered ~ id:", id);
  let ResultPayment = {
    vnp_ResponseCode: query.vnp_ResponseCode,
    vnp_TransactionStatus: query.vnp_TransactionStatus,
  };
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
        })
        .catch((err) => {
          console.log("loi roi");
        });
      axios
        .patch(`http://localhost:4000/orders/${id}`, ResultPayment)

        .then((res1) => {
          window.location.replace(
            `http://localhost:3000/checkout/thankyou/${query.vnp_TxnRef}`
          );
        })
        .catch((err1) => {
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
        })
        .catch((err) => {
          console.log("loi roi");
        });
      axios
        .patch(`http://localhost:4000/guestOrders/${id}`, ResultPayment)
        .then((res1) => {
          navigate({
            pathname: generatePath(ROUTES.USER.THANKYOU, {
              id: query.vnp_TxnRef,
            }),
          });
        })
        .catch((err1) => {
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
