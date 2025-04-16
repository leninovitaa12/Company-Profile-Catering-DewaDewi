import { useState } from "react";
import AddUserForm from "./AddUserForm"; // Impor komponen form pembuatan user
import { useAuthContext } from "../context/AuthContext";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState(["admin1", "admin2"]);
  const { authUser } = useAuthContext();

  if (authUser.role !== "super-admin")
    return (
      <div className="text-2xl mt-20 text-red-600 text-center">
        ERROR 401! akses ditolak
      </div>
    );

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-5">Super User Dashboard</h2>
      <ul>
        {admins.map((admin, index) => (
          <li key={index}>{admin}</li>
        ))}
      </ul>
      {/* Menampilkan form untuk menambah user */}
      <h3 className="mt-5 text-xl">Add New Admin</h3>
      <AddUserForm /> {/* Formulir untuk menambah user baru */}
    </div>
  );
};

export default SuperAdminDashboard;
