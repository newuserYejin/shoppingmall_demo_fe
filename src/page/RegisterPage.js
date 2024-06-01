import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../action/userAction";
import "../style/register.style.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [errorResult, setErrorResult] = useState(false)


  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });

  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const error = useSelector((state) => state.user.error);

  const register = (event) => {
    event.preventDefault();
    const { email, name, password, confirmPassword, policy } = formData
    // 비번 중복확인 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError("비밀번호와 재입력 비밀번호가 일치하지 않습니다.")
      return;
    }
    // 이용약관에 체크했는지 확인
    if (!policy) {
      setPolicyError(true)
      return;
    }
    // FormData에 있는 값을 가지고 백엔드로 넘겨주기
    setPasswordError("")
    setPolicyError(false)
    dispatch(userActions.registerUser({ email, name, password }, navigate, setErrorResult))
    //성공후 로그인 페이지로 넘어가기
  };

  useEffect(() => {
    if (errorResult === true) {
      console.log("값비우기")

      setFormData({
        ...formData,
        name: "", // 혹은 다른 필드를 비우려면 해당 필드를 비워주세요
        password: "",
        confirmPassword: ""
      });
      setErrorResult(false)
    }
  }, [errorResult])

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value, checked } = event.target

    console.log("id:", id, checked)
    if (id === 'policy') {
      setFormData({ ...formData, [id]: checked })

    } else {
      setFormData({ ...formData, [id]: value })
    }
  };

  return (
    <Container className="register-area">
      {error && (
        <div>
          <Alert variant="danger" className="error-message">
            {error}
          </Alert>
        </div>
      )}
      <Form onSubmit={register}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
            required
            isInvalid={passwordError}
          />
          <Form.Control.Feedback type="invalid">
            {passwordError}
            {/* {passwordError ? passwordError : policyError ? policyError : ""} */}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="이용약관에 동의합니다"
            id="policy"
            onChange={handleChange}
            isInvalid={policyError}
            checked={formData.policy}
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
