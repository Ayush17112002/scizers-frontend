import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import icon from "../images/icon.jpg";
import "./ContactList.css";
import edit from "../images/edit.png";
import trash from "../images/trash.png";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

export default function ContactList() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  let [display, setDisplay] = useState([]);

  if (error !== null) {
    alert(error);
    dispatch({ type: "ERROR" });
  }
  function deleteContactHandler(e) {
    const id = e.target.classList.value;
    dispatch({ type: "DELETE", payload: { id: id } });
  }

  function displayHandler(filteredContacts) {
    setDisplay((state) => filteredContacts);
  }

  if (display.length > 0) {
    display = display.map((contact) => {
      return (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={contact.id}
        >
          <img src={icon} alt="icon"></img>
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {contact.name[0].toUpperCase() + contact.name.slice(1)}{" "}
            </div>
            {contact.phone}
          </div>
          <>
            <Badge bg="light" pill>
              <Link to={`/contact/${contact.id}/edit`}>
                <img src={edit} className="icon" alt="Edit"></img>
              </Link>
            </Badge>
          </>

          <Badge bg="light" pill>
            <img
              src={trash}
              className={contact.id}
              onClick={deleteContactHandler}
              alt="Delete"
            ></img>
          </Badge>
        </ListGroup.Item>
      );
    });
  } else {
    display = [];
  }
  return (
    <div className="contact-list">
      <div className="header">
        <Search onSearch={displayHandler}></Search>
        <Link to={"/contact/add"}>
          <Button variant="primary">Add Contact</Button>
        </Link>
      </div>
      <ListGroup as="ol" numbered>
        {display}
      </ListGroup>
    </div>
  );
}
