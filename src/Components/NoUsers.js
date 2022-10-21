import { Link } from "react-router-dom";

export default function NoUsers() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "250px" }}>NO USERS!!</h1>
      {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link
          to="/add"
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            margin: "0 auto",
            textDecoration: "none",
            color: "black",
          }}
        >
          ADD USER
        </Link>
      </div> */}
    </div>
  );
}
