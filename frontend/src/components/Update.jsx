import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch user data by ID
  const getUserData = async () => {
    try {
      const response = await fetch(`/api/user/userdetails/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to fetch user");
      } else {
        setUserData(result.data);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setError("");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Update user
  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`/api/user/updateuser/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name, email, age }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Update failed");
      } else {
        setResponse(result.message || "Updated successfully");
        setError("");
        setTimeout(() => {
          navigate("/userlist");
        }, 1000);
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
      {response && (
        <div className="alert alert-success" role="alert">
          {response}
        </div>
      )}

      <h2>Edit the Data</h2>

      <form onSubmit={handleEdit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            name="age"
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Update;
