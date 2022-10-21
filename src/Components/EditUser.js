import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditUser.css";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = (props) => {
  const [firstName, setFirstName] = useState(props.data.first_name);
  const [lastName, setLastName] = useState(props.data.last_name);
  const [emails, setEmail] = useState(props.data.email);
  const [error, setError] = useState("");

  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  function firstNameHandler(e) {
    setFirstName(e.target.value);
  }

  function lastNameHandler(e) {
    setLastName(e.target.value);
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function emailHandler(e) {
    if (!isValidEmail(e.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setEmail(e.target.value);
  }

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      emails.trim() === ""
    ) {
      if (firstName.trim() === "") setIsFirstNameValid(false);

      if (lastName.trim() === "") setIsLastNameValid(false);
      return;
    } else {
      setIsFirstNameValid(true);

      setIsLastNameValid(true);

      let newobj = {
        id: props.data.id,
        first_name: firstName,
        last_name: lastName,
        email: emails,
      };

      axios
        .put(`https://reqres.in/api/users/${props.data.id}`, newobj)
        .then((res) => {
          console.log(res.data);

          let arr = [...props.users];
          let index = arr.findIndex((x) => x.id === props.data.id);

          arr.map((user) => {
            if (user.id === res.data.id) {
              arr[index].first_name = res.data.first_name;
              arr[index].first_name =
                arr[index].first_name.charAt(0).toUpperCase() +
                arr[index].first_name.slice(1);

              arr[index].last_name = res.data.last_name;
              arr[index].last_name =
                arr[index].last_name.charAt(0).toUpperCase() +
                arr[index].last_name.slice(1);
              arr[index].email = res.data.email;
            }
          });
          props.setUsers(arr);

          toast.success("USER EDITED", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });

      navigate("/");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            defaultValue={props.data.first_name}
            onChange={firstNameHandler}
            required
          ></input>
          {!isFirstNameValid && (
            <p style={{ color: "red" }}>First Name must not be Empty</p>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            defaultValue={props.data.last_name}
            onChange={lastNameHandler}
            required
          ></input>
          {!isLastNameValid && (
            <p style={{ color: "red" }}>Last Name must not be Empty</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            onChange={emailHandler}
            defaultValue={props.data.email}
            required
          ></input>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <button type="submit" className="edit-submit-button">
          EDIT
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default EditUser;
