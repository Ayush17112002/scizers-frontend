import style from "./Add.module.css";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function AddContact() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contactState, setContactState] = useState({
    id: uuidv4(),
    name: "",
    phone: NaN,
  });

  function nameHandler(e) {
    setContactState((state) => {
      return { ...state, name: e.target.value };
    });
  }

  function phoneHandler(e) {
    setContactState((state) => {
      return { ...state, phone: Number(e.target.value) };
    });
  }
  function submitHandler(e) {
    dispatch({ type: "ADD", payload: contactState });
    navigate("/");
  }
  return (
    <Form className="m-4" onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Name"
          onChange={nameHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter phone number"
          onChange={phoneHandler}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={submitHandler}
        disabled={String(contactState.phone).length !== 10}
      >
        Add
      </Button>
    </Form>
  );
}
