import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // Fetch all users
  const getData = async () => {
    try {
      const response = await fetch("/api/user/userlist");
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to fetch data");
        setData([]);
      } else {
        setData(result.data);
        setError("");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/user/deleteuser/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Delete failed");
      } else {
        setError("Deleted successfully");
        setTimeout(() => {
          setError("");
          getData(); // refresh list
        }, 1500);
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="container my-2">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <h2 className="text-center">User List</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="card-link m-2">
                    Edit
                  </Link>
                  <button
                    className="btn btn-link p-0 m-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Read;
