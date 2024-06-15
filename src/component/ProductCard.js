import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    // 상품 디테일 페이지로 가기
    navigate(`/product/${id}`)
  };

  const isSoldOut = Object.values(item.stock).every(stock => stock === 0)

  return (
    <div className="card" onClick={() => showProduct(item._id)}>
      <img
        src={item.image}
        alt=""
      />
      {isSoldOut ? (
        <div className="sold_out">
          <div>Sold Out</div>
        </div>
      ) : ""}
      <div>{item.name}</div>
      <div>₩ {item.price}</div>
    </div >
  );
};

export default ProductCard;
