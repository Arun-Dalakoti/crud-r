import "./User.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User(props) {
  const navigate = useNavigate();

  function deleteHandler() {
    const obj = {
      id: props.user.id,
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
    };

    axios
      .delete(`https://reqres.in/api/users/${props.user.id}`, obj)
      .then((res) => {
        console.log(res);
        const newArray = props.users.filter((user) => {
          return user.id !== props.user.id;
        });

        props.setUsers(newArray);
      });

    toast.success("USER DELETED", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    navigate("/");
  }

  function editHandler() {
    props.findData(props.user);
  }

  return (
    <tr>
      <td>{props.user.first_name}</td>
      <td>{props.user.last_name}</td>
      <td>{props.user.email}</td>
      <td>
        <Link to="/" onClick={deleteHandler}>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/filled-trash.png"
            className="delete-icon"
          />
        </Link>

        <Link to="/edit" onClick={editHandler}>
          <img
            src="https://img.icons8.com/material-outlined/24/000000/edit--v3.png"
            className="edit-icon"
          />
        </Link>
      </td>
      <ToastContainer></ToastContainer>
    </tr>
  );
}
