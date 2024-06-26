import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { ColorRing } from "react-loader-spinner";
import { cartActions } from "../action/cartAction";
import { commonUiActions } from "../action/commonUiAction";
import { currencyFormat } from "../utils/number";
import "../style/productDetail.style.css";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productDetail, loading } = useSelector((state) => state.product)
  const [size, setSize] = useState("");
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const { user } = useSelector(state => state.user)

  const navigate = useNavigate();

  const addItemToCart = () => {
    // 1. 사이즈를 아직 선택안했다면 에러
    if (size === "") {
      setSizeError(true)
      return
    }
    // 2. 아직 로그인을 안한유저라면 로그인페이지로
    if (!user) {
      navigate('/login')
      return dispatch(commonUiActions.showToastMessage("Login First", "error"))
    }
    // 3. 카트에 아이템 추가하기
    dispatch(cartActions.addToCart({ id, size }))
  };

  const selectSize = (value) => {
    // 사이즈 추가하기
    if (sizeError) setSizeError(false)
    setSize(value)
  };

  useEffect(() => {
    //상품 디테일 정보 가져오기
    dispatch(productActions.getProductDetail(id))
  }, [id]);

  if (loading || !productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="product-detail-card">
      <Row>
        <Col sm={6}>
          <img
            src={productDetail.image}
            className="w-100"
            alt="image"
          />
        </Col>
        <Col className="product-info-area" sm={6}>
          <div className="product-info">{productDetail.name}</div>
          <div className="product-info">₩ {productDetail.price}</div>
          <div className="product-info">{productDetail.description}</div>

          <Dropdown
            className="drop-down size-drop-down"
            title={size}
            align="start"
            onSelect={(value) => selectSize(value)}
          >
            <Dropdown.Toggle
              className="size-drop-down"
              variant={sizeError ? "outline-danger" : "outline-dark"}
              id="dropdown-basic"
              align="start"
            >
              {size === "" ? "select size" : size.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu className="size-drop-down">
              {/* <Dropdown.Item>M</Dropdown.Item> */}
              {Object.entries(productDetail.stock).map(([size, quantity]) => (
                <Dropdown.Item key={size} eventKey={size}
                  style={quantity === 0 ? { textDecorationLine: "line-through" } : { textDecorationLine: "none" }}
                  disabled={quantity === 0}
                >
                  {`${size.toUpperCase()}: ${quantity}stock`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="warning-message">
            {sizeError && "plz select your size."}
          </div>
          <Button variant="dark" className="add-button" onClick={addItemToCart}>
            추가
          </Button>
        </Col>
      </Row>
    </Container >
  );
};

export default ProductDetail;
