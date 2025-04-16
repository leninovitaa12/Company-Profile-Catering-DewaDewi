import { useState } from "react";
import axios from "axios";

const AddUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/create-user", {
        name,
        email,
        password,
        role,
      });
      alert("User created successfully!");
    } catch (error) {
      alert("Error creating user: " + error.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="superuser">Superuser</option>
      </select>
      <button type="submit">Create User</button>
    </form>
  );
};

export default AddUserForm;
