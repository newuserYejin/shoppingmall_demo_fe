import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";
import { useNavigate } from "react-router";

const MyPage = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector(state => state.order)
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()

  //오더리스트 들고오기
  useEffect(() => {
    dispatch(orderActions.getOrder())
    console.log("get orderList", orderList)
  }, [dispatch])

  // 로그인 안한 상태면 login페이지로 이동
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])


  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  return (
    <Container className="status-card-container">
      {orderList.length === 0 || !orderList ?
        (<div className="text-align-center empty-bag">
          <h2>주문한 상품이 없습니다.</h2>
        </div>) :
        (orderList && orderList.map((order) => (
          <OrderStatusCard key={order._id} order={order} />
        )))
      }
    </Container>
  );
};

export default MyPage;
