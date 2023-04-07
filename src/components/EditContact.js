import { useLoaderData, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EditContact() {
  const contact = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contactState, setContactState] = useState(contact);

  function nameHandler(e) {
    setContactState((state) => {
      return { ...state, name: e.target.value };
    });
  }

  function phoneHandler(e) {
    setContactState((state) => {
      return { ...state, phone: e.target.value };
    });
  }

  function submitHandler(e) {
    dispatch({ type: "UPDATE", payload: contactState });
    navigate("/");
  }
  return (
    <Form className="m-4" onSubmit={(e) => e.preventDefault()}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder={contactState.name}
          onChange={nameHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="number"
          placeholder={contactState.phone}
          onChange={phoneHandler}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={submitHandler}
        disabled={String(contactState.phone).length !== 10}
      >
        Update
      </Button>
    </Form>
  );
}
