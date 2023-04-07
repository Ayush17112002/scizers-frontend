import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InputGroup, Form } from "react-bootstrap";

export default function Search(props) {
  // search phrase
  // sort by name || phone
  // search and sort
  // function to update display
  const contacts = useSelector((state) => state.contacts);
  let filteredContacts = JSON.parse(JSON.stringify(contacts));
  const [filter, setFilter] = useState({
    phrase: "",
    sortByName: false,
    sortByPhone: false,
  });
  function phraseHandler(e) {
    setFilter((state) => {
      return { ...state, phrase: e.target.value };
    });
  }
  function sortByName(e) {
    setFilter((state) => {
      return { ...state, sortByName: !state.sortByName };
    });
  }
  function sortByPhone(e) {
    setFilter((state) => {
      return { ...state, sortByPhone: !state.sortByPhone };
    });
  }
  useEffect(() => {
    const id = setTimeout(() => {
      //SEARCH
      filteredContacts = [];
      for (const contact of contacts) {
        let { name, phone, id } = JSON.parse(JSON.stringify(contact));
        let splittedName = name.split(" ");
        for (const val of splittedName) {
          if (
            val.startsWith(filter.phrase.toLocaleLowerCase()) ||
            String(phone).startsWith(filter.phrase)
          )
            filteredContacts.push({ name, phone, id });
          break;
        }
      }

      //SORT
      if (filter.sortByName) {
        filteredContacts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (filter.sortByPhone) {
        filteredContacts.sort((a, b) => {
          if (a.phone > b.phone) return 1;
          return -1;
        });
      }

      props.onSearch(filteredContacts);
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, [filter, contacts]);

  return (
    <>
      <InputGroup className="mb-3 me-2">
        <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={phraseHandler}
        />
      </InputGroup>
      <Form onSubmit={(e) => e.preventDefault()}>
        {["checkbox"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              disabled={filter.sortByPhone ? true : false}
              inline
              label="Sort By Name"
              name="group1"
              type={type}
              id={`inline-${type}-1`}
              onChange={sortByName}
            />
            <Form.Check
              disabled={filter.sortByName ? true : false}
              inline
              label="Sort By Phone Number"
              name="group1"
              type={type}
              id={`inline-${type}-2`}
              onClick={sortByPhone}
            />
          </div>
        ))}
      </Form>
    </>
  );
}
