import { createStore } from "redux";
let contacts;
if (!localStorage.hasOwnProperty("contacts")) {
  contacts = [];
  localStorage.setItem("contacts", JSON.stringify([]));
} else {
  contacts = JSON.parse(localStorage.getItem("contacts"));
}

const initialState = {
  contacts: contacts,
  error: null,
};

const store = createStore((state = initialState, action) => {
  let { contacts, error } = JSON.parse(JSON.stringify(state));
  let newState = { contacts, error };

  if (action.type === "ERROR") {
    newState.error = null;
  } else if (action.type === "ADD") {
    if (isUnique(action.payload.phone, state) === null) {
      action.payload.name = action.payload.name.toLowerCase();
      contacts.push(action.payload);
      newState = { contacts: contacts, error: null };
    } else {
      newState = { contacts: contacts, error: "Duplicate Phone number" };
    }
  } else if (action.type === "UPDATE") {
    const id = isUnique(action.payload.phone, state);
    let tmp = contacts.map((contact) => {
      if (contact.id === action.payload.id) {
        if (id !== null && id !== contact.id) {
          error = "Duplicate Phone number";
          return contact;
        } else {
          //update
          action.payload.name = action.payload.name.toLowerCase();
          return action.payload;
        }
      } else {
        return contact;
      }
    });
    newState = { contacts: tmp, error: error };
  } else if (action.type === "DELETE") {
    let tmp = contacts.filter((contact) => {
      return contact.id !== action.payload.id;
    });
    newState = { contacts: tmp, error: null };
  }

  localStorage.setItem("contacts", JSON.stringify(newState.contacts));

  return newState;
});

function isUnique(phone, state) {
  let id = null;
  state.contacts.map((contact) => {
    if (Number(contact.phone) === Number(phone)) {
      id = contact.id;
    }
  });
  return id;
}
export default store;
