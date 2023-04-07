import store from "../store/contacts.store";
export function loader({ params }) {
  const { contacts } = store.getState();
  let mycontact;
  for (const contact of contacts) {
    if (contact.id === params.id)
      mycontact = JSON.parse(JSON.stringify(contact));
  }
  return mycontact;
}
