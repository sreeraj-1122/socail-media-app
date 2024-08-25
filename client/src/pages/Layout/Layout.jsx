import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../context/StoreContextProvider";
import Navbar from "../../components/navbar/Navbar";

const Layout = () => {
  const { isAuthenticated } = useStore();
  console.log("layout", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
        <Navbar/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
