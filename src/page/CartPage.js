import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../action/cartAction";
import CartProductCard from "../component/CartProductCard";
import OrderReceipt from "../component/OrderReceipt";
import "../style/cart.style.css";
import { useNavigate } from "react-router";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    // 카트리스트 불러오기
    dispatch(cartActions.getCartList())
    console.log("cart:", cartList)
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return (
    <Container>
      <Row>
        <Col xs={12} md={7}>
          {cartList.length > 0 ? (
            cartList.map((item) =>
              <CartProductCard item={item} key={item._id} />)
          ) :
            (<div className="text-align-center empty-bag">
              <h2>카트가 비어있습니다.</h2>
              <div>상품을 담아주세요!</div>
            </div>)}
        </Col>
        <Col xs={12} md={5}>
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
