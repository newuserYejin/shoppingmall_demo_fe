import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import { commonUiActions } from "../action/commonUiAction";

const ProductAll = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.product.error);
  // 처음 로딩하면 상품리스트 불러오기

  const { productList } = useSelector(state => state.product)
  console.log("productList:", productList)

  const [query] = useSearchParams();
  const searchQuery = query.get("name") || ""

  useEffect(() => {
    dispatch(productActions.getProductList({ name: searchQuery }))
    console.log("query:", searchQuery.name)
    console.log("search result:", productList)
  }, [searchQuery])

  return (
    <Container>
      <Row>
        {productList && productList.length > 0 ? (productList.map((item, index) => (
          <Col md={3} sm={12}>
            <ProductCard item={item} />
          </Col>)
        )) : (<Col md={3} sm={12}>
          <div>검색결과가 없습니다</div>
        </Col>)}
      </Row>
    </Container>
  );
};

export default ProductAll;
