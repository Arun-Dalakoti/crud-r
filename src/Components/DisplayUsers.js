import User from "./User";
import "./DisplayUsers.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./DisplayUsers.css";

export default function DisplayUsers(props) {
  const [fsearchInput, setfSearchInput] = useState("");
  const [lsearchInput, setlSearchInput] = useState("");
  const [esearchInput, seteSearchInput] = useState("");

  const [firstNameInput, setFirstNameInput] = useState(false);
  const [lastNameInput, setLastNameInput] = useState(false);
  const [emailInput, setemailInput] = useState(false);

  function fuphandler() {
    const strAscending = [...props.users].sort((a, b) =>
      a.first_name > b.first_name ? 1 : -1
    );
    props.setUsers(strAscending);
  }

  function fdownhandler() {
    const strDescending = [...props.users].sort((a, b) =>
      a.first_name < b.first_name ? 1 : -1
    );
    props.setUsers(strDescending);
  }

  function luphandler() {
    const strAscending = [...props.users].sort((a, b) =>
      a.last_name > b.last_name ? 1 : -1
    );
    props.setUsers(strAscending);
  }

  function ldownhandler() {
    const strDescending = [...props.users].sort((a, b) =>
      a.last_name < b.last_name ? 1 : -1
    );
    props.setUsers(strDescending);
  }

  function euphandler() {
    const strAscending = [...props.users].sort((a, b) =>
      a.email > b.email ? 1 : -1
    );
    props.setUsers(strAscending);
  }

  function edownhandler() {
    const strDescending = [...props.users].sort((a, b) =>
      a.email < b.email ? 1 : -1
    );
    props.setUsers(strDescending);
  }

  return (
    <div className="front-page">
      <header>
        <h1 className="heading">USERS LIST</h1>
      </header>
      <table>
        <tr>
          <th>
            First Name
            <input
              onChange={(event) => {
                setfSearchInput(event.target.value);
              }}
              onFocus={() => setFirstNameInput(true)}
              onBlur={() => setFirstNameInput(false)}
              className="search-bar"
              placeholder="Search..."
            ></input>
            <button id="up" onClick={fuphandler}>
              &uarr;
            </button>
            <button id="down" onClick={fdownhandler}>
              &darr;
            </button>
          </th>
          <th>
            Last Name
            <input
              onChange={(event) => {
                setlSearchInput(event.target.value);
              }}
              onFocus={() => setLastNameInput(true)}
              onBlur={() => setLastNameInput(false)}
              className="search-bar"
              placeholder="Search..."
            ></input>
            <button id="up" onClick={luphandler}>
              &uarr;
            </button>
            <button id="down" onClick={ldownhandler}>
              &darr;
            </button>
          </th>
          <th>
            Email
            <input
              onChange={(event) => {
                seteSearchInput(event.target.value);
              }}
              onFocus={() => setemailInput(true)}
              onBlur={() => setemailInput(false)}
              className="search-bar"
              placeholder="Search..."
            ></input>
            <button id="up" onClick={euphandler}>
              &uarr;
            </button>
            <button id="down" onClick={edownhandler}>
              &darr;
            </button>
          </th>
          <th>Actions</th>
        </tr>

        {console.log(fsearchInput, lsearchInput, esearchInput)}
        {props.users
          .filter((val) => {
            if (
              fsearchInput === "" &&
              lsearchInput === "" &&
              esearchInput === ""
            ) {
              return val;
            }
            if (
              firstNameInput &&
              val.first_name.toLowerCase().includes(fsearchInput.toLowerCase())
            ) {
              return val;
            }
            if (
              lastNameInput &&
              val.last_name.toLowerCase().includes(lsearchInput.toLowerCase())
            ) {
              return val;
            }
            if (
              emailInput &&
              val.email.toLowerCase().includes(esearchInput.toLowerCase())
            ) {
              return val;
            }
          })
          .map((user) => {
            return (
              <User
                users={props.users}
                user={user}
                key={user.id}
                setUsers={props.setUsers}
                findData={props.findData}
              ></User>
            );
          })}
      </table>
      <Link to="/add" className="add-user-button">
        ADD USER
      </Link>
    </div>
  );
}
