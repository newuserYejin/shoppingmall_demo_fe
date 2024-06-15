import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ order }) => {
  return (
    <div>
      <Row className="status-card">
        <Col xs={3}>
          <img
            src={order.items[0].productId.image}
            alt=""
            height={96}
            width={90}
          />
        </Col>
        <Col xs={8} className="order-info">
          <div>
            <strong>OrderNum: {order.orderNum}</strong>
          </div>

          <div className="text-12">{new Date(order.createdAt).toLocaleDateString('ko-KR')}</div>

          <div>
            {order.items.length > 1 ? (
              <div>{order.items[0].productId.name} 외 {order.items.length - 1} 개</div>
            ) : (
              <div>{order.items[0].productId.name}</div>
            )}
          </div>

          <div>₩ {currencyFormat(order.totalPrice)}</div>
        </Col>
        <Col md={2} className="vertical-middle">
          <div className="text-align-center text-12">Order Status</div>
          <Badge bg={badgeBg[order.status]}>{order.status}</Badge>
        </Col>
      </Row>
    </div>
  );
};

export default OrderStatusCard;
