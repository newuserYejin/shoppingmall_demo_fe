import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Dropdown } from "react-bootstrap";
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
  const [sort, setSort] = useState('ALL')

  const sorts = ['ALL', 'Preparing', 'Shipping', 'Delivered', 'Refund']
  const [sortedList, setSortedList] = useState([...orderList])

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

  useEffect(() => {

    if (sort === "ALL") {
      setSortedList(orderList)
    } else {
      setSortedList(orderList.filter(order => order.status === sort.toLowerCase()))
    }

    console.log("sortedList:", sortedList)
  }, [sort])

  const sortBy = (sort) => {
    setSort(sort)
  }

  // 오더리스트가 없다면? 주문한 상품이 없습니다 메세지 보여주기
  return (
    <Container className="status-card-container statusPages">
      <div className="status_orderByBox">
        <Dropdown className="orderBy-down">
          <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
            {sort}
          </Dropdown.Toggle>

          <Dropdown.Menu >
            {sorts.map(sort => (
              <Dropdown.Item key={sort} eventKey={sort} onClick={() => sortBy(sort)}>
                {`${sort}`}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        {sortedList.length === 0 || !sortedList ?
          (<div className="text-align-center empty-bag">
            <h2>상품이 없습니다.</h2>
          </div>) :
          (sortedList && sortedList.map((order) => (
            <OrderStatusCard key={order._id} order={order} />
          )))
        }
      </div>
    </Container>
  );
};

export default MyPage;
