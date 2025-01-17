import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../../context/StoreContextProvider";
import Navbar from "../../components/navbar/Navbar";
import EditProfile from "../../components/Edit profile/EditProfile";

const Layout = () => {
  const { isAuthenticated, isOpen } = useStore();
  console.log("layout", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return (
    <>
      {isOpen && <EditProfile />}
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
