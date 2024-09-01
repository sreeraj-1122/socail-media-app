import React from "react";
import Auth from "./pages/auth/Auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Bounce } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/home/Home";
import Profile from "./components/profile/Profile";
import Friends from "./components/friends/Friends";

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Router>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends heading="Friends" />} />
            <Route path="/friendreq" element={<Friends heading="Friend Request" />} />
            <Route path="/friendssuggest" element={<Friends heading="Friend Suggestions" />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
