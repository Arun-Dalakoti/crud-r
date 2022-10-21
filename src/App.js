import "./App.css";
import { Route, Routes } from "react-router-dom";
import DisplayUsers from "./Components/DisplayUsers";
import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./Components/UserForm";
import EditUser from "./Components/EditUser";
import NoUsers from "./Components/NoUsers";

const url = "https://reqres.in/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!users.length) return <NoUsers></NoUsers>;

  function findData(obj) {
    setData(obj);
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <DisplayUsers
              users={users}
              setUsers={setUsers}
              findData={findData}
            />
          }
        ></Route>
        <Route
          path="/add"
          element={<UserForm users={users} setUsers={setUsers}></UserForm>}
        ></Route>
        <Route
          path="/edit"
          element={
            <EditUser data={data} users={users} setUsers={setUsers}></EditUser>
          }
          users={users}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
