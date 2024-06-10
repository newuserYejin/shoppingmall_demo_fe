import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import { useSelector } from "react-redux";

const OrderReceipt = ({ cartList, totalPrice }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [totalProductCount, setTotalProductCount] = useState(0)

  useEffect(() => {
    // 각 item의 qty를 더하여 totalProductCount를 계산
    const totalCount = cartList.reduce((sum, item) => sum + item.qty, 0);
    setTotalProductCount(totalCount);
  }, [cartList]);

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">주문 내역</h3>
      <ul className="receipt-list">
        {cartList.map((item) => (
          <li>
            <div className="display-flex space-between">
              <div>{item.productId.name}</div>

              <div>₩ {currencyFormat(item.productId.price * item.qty)}</div>
            </div>
          </li>
        ))}
      </ul>
      <div className="display-flex space-between receipt-title">
        <div>
          <strong>Total Count:</strong>
        </div>
        <div>
          <strong>{totalProductCount}</strong>
        </div>
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>₩ {currencyFormat(totalPrice)}</strong>
        </div>
      </div>
      {location.pathname.includes("/cart") && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          결제 계속하기
        </Button>
      )}

      <div>
        가능한 결제 수단 귀하가 결제 단계에 도달할 때까지 가격 및 배송료는
        확인되지 않습니다.
        <div>
          30일의 반품 가능 기간, 반품 수수료 및 미수취시 발생하는 추가 배송 요금
          읽어보기 반품 및 환불
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
