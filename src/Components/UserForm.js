import { Form, Field } from "react-final-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserForm.css";

import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = "https://reqres.in/api/users";
let id = 7;

// const UserForm = (props) => {
//   const navigate = useNavigate();

//   function showResults(event) {
//     let newobj = {
//       id: id++,
//       first_name: event.firstName,
//       last_name: event.lastName,
//       email: event.email,
//     };

//     axios.post(url, newobj).then((res) => {
//       console.log(res.data);
//       let data = res.data;

//       res.data.first_name =
//         res.data.first_name.charAt(0).toUpperCase() +
//         res.data.first_name.slice(1);
//       res.data.last_name =
//         res.data.last_name.charAt(0).toUpperCase() +
//         res.data.last_name.slice(1);

//       props.setUsers([...props.users, data]);

//       toast.success("USER ADDED", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     });

//     navigate("/");
//   }

//   return (
//     <div>
//       <Form
//         onSubmit={showResults}
//         validate={(values) => {
//           const errors = {};

//           if (!values.firstName) {
//             errors.firstName = "First Name must not be empty";
//           }

//           if (!values.lastName) {
//             errors.lastName = "Last Name must not be empty";
//           }

//           if (!values.email) {
//             errors.email = "Email must not be empty";
//           }
//           return errors;
//         }}
//       >
//         {({ handleSubmit }) => (
//           <form onSubmit={handleSubmit}>
//             <div>
//               <Field name="firstName" trim>
//                 {({ input, meta }) => (
//                   <div>
//                     <label>First Name</label>
//                     <input
//                       {...input}
//                       type="text"
//                       placeholder="First Name"
//                     ></input>
//                     {meta.error && meta.touched && (
//                       <div style={{ color: "red" }}>{meta.error}</div>
//                     )}
//                   </div>
//                 )}
//               </Field>
//             </div>
//             <div>
//               <Field name="lastName" trim>
//                 {({ input, meta }) => (
//                   <div>
//                     <label>Last Name</label>
//                     <input
//                       {...input}
//                       type="text"
//                       placeholder="Last Name"
//                     ></input>
//                     {meta.error && meta.touched && (
//                       <div style={{ color: "red" }}>{meta.error}</div>
//                     )}
//                   </div>
//                 )}
//               </Field>
//             </div>
//             <div>
//               <Field name="email" trim>
//                 {({ input, meta }) => (
//                   <div>
//                     <label>Email</label>
//                     <input {...input} type="text" placeholder="Email"></input>
//                     {meta.error && meta.touched && (
//                       <div style={{ color: "red" }}>{meta.error}</div>
//                     )}
//                   </div>
//                 )}
//               </Field>
//             </div>

//             <div>
//               <button type="submit" className="add-submit-button">
//                 ADD
//               </button>
//             </div>
//           </form>
//         )}
//       </Form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default UserForm;

export default function UserForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emails, setEmail] = useState("");
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
        id: id++,
        first_name: firstName,
        last_name: lastName,
        email: emails,
      };

      axios.post(url, newobj).then((res) => {
        console.log(res.data);
        let data = res.data;

        res.data.first_name =
          res.data.first_name.charAt(0).toUpperCase() +
          res.data.first_name.slice(1);
        res.data.last_name =
          res.data.last_name.charAt(0).toUpperCase() +
          res.data.last_name.slice(1);

        props.setUsers([...props.users, data]);

        toast.success("USER ADDED", {
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
          <input type="text" onChange={firstNameHandler} required></input>
          {!isFirstNameValid && (
            <p style={{ color: "red" }}>First Name must not be Empty</p>
          )}
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" onChange={lastNameHandler} required></input>
          {!isLastNameValid && (
            <p style={{ color: "red" }}>Last Name must not be Empty</p>
          )}
        </div>
        <div>
          <label>Email</label>
          <input type="email" onChange={emailHandler} required></input>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <button type="submit" className="edit-submit-button">
          ADD
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
