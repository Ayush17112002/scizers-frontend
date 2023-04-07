import React from "react";
import "./root.css";
import ContactList from "../components/ContactList";

export default function Root() {
  return (
    <React.Fragment>
      <div className="heading">
        <b>Contact Address Manager</b>
      </div>
      <ContactList></ContactList>
    </React.Fragment>
  );
}
