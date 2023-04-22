import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { Image } from "antd";
import { Button } from "antd";

function ProductDetail() {
  const [DataList, setDataList] = useState([]);
  async function test() {
    return await "a";
  }
  useEffect(() => {
    // API_ENDPOINT là bất kỳ đường dẫn API nào trả về dạng JSON

    // const a = async function test1(req, res) {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response);
        // Kiểm tra trạng thái phản hồi
        if (!response.ok) {
          throw new Error(response);
        }

        // Phản hồi không lỗi, trả về JSON cho then tiếp theo lấy dữ liệu
        return response.json();
      })
      .then((data) => {
        console.log("dât", data);
        // Lấy dữ liệu và setState cho data
        setDataList(data);
      })
      .catch((err) => alert("Có lỗi", err))
      .finally(() => {
        console.log("End");
      });
  }, []);
  console.log("aaaa", DataList);

  const params = useParams();
  console.log("🚀 ~ file: index.jsx:5 ~ ProductDetailPage ~ params:", params);
  // const { id } = useParams();

  const detailProduct = DataList.filter((e) => e.id == params.id);
  console.log(
    "🚀 ~ file: index.jsx:35 ~ ProductDetail ~ detailProduct:",
    detailProduct
  );

  return (
    <S.DetailProduct>
      <h4 style={{ margin: "20px 0" }}>
        Sản Phẩm > {detailProduct.map((item) => item.category)} >
        {detailProduct.map((item) => item.title.slice(0, 30))}{" "}
      </h4>
      <h1 style={{ marginBottom: "20px" }}>
        {detailProduct.map((item) => item.title)}
      </h1>
      <S.Detail>
        <S.DetailContent>
          <S.WrapperImage>
            <S.CustonImage.PreviewGroup
              preview={{
                onChange: (current, prev) =>
                  console.log(`current index: ${current}, prev index: ${prev}`),
              }}
            >
              <Image src={detailProduct.map((item) => item.image)} />
            </S.CustonImage.PreviewGroup>
          </S.WrapperImage>
        </S.DetailContent>
        <S.DetailBuy>
          <h2>{detailProduct.map((item) => item.price)}$</h2>

          <Button type="primary" block style={{ marginTop: 20 }}>
            Buy
          </Button>
          <Button block style={{ marginTop: 20 }}>
            Add Cart
          </Button>
        </S.DetailBuy>
        <h2 style={{ marginTop: 30 }}>Thông tin sản phẩm</h2>
        <S.Descrip>{detailProduct.map((item) => item.description)}</S.Descrip>
      </S.Detail>
    </S.DetailProduct>
  );
}

export default ProductDetail;
