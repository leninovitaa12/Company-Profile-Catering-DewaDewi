import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <ToastContainer />
    </>
  );
};

export default Layout;
