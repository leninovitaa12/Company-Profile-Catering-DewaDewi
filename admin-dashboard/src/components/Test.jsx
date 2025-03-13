import React from "react";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hook/useLogout";

const Test = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  return (
    <div>
      <h1>Welcome {authUser.name}</h1>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

export default Test;
