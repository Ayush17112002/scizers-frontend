import { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import { InputGroup, Form } from "react-bootstrap";
function KMPSearch(pat, txt) {
  pat = String(pat);
  txt = String(txt);
  pat = pat.toLowerCase();
  txt = txt.toLowerCase();
  let M = pat.length;
  let N = txt.length;
  let lps = new Array(M);

  // Preprocess the pattern (calculate lps[] array)
  computeLPSArray(pat, M, lps);

  let i = 0; // index for txt[]
  let j = 0; // index for pat[]
  while (N - i >= M - j) {
    if (pat[j] === txt[i]) {
      j++;
      i++;
    }

    if (j === M) {
      return true;
      j = lps[j - 1];
    } else if (i < N && pat[j] !== txt[i]) {
      if (j !== 0) j = lps[j - 1];
      else i = i + 1;
    }
  }
  return false;
}
function computeLPSArray(pat, M, lps) {
  let len = 0;

  lps[0] = 0;

  let i = 1;
  while (i < M) {
    if (pat[i] === pat[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
}
function Search({ onSearch }) {
  // search phrase
  // sort by name || phone
  // search and sort
  // function to update display
  const contacts = useSelector((state) => state.contacts);
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
      let filteredContacts = [];
      for (const contact of contacts) {
        let { name, phone, id } = JSON.parse(JSON.stringify(contact));
        let splittedName = name.split(" ");
        let found = false;
        for (const val of splittedName) {
          if (
            KMPSearch(filter.phrase, val) ||
            KMPSearch(filter.phrase, phone)
          ) {
            filteredContacts.push({ name, phone, id });
            found = true;
            break;
          }
        }
        if (!found && KMPSearch(filter.phrase, name)) {
          filteredContacts.push({ name, phone, id });
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

      onSearch(filteredContacts);
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, [filter, contacts, onSearch]);

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
export default memo(Search);
