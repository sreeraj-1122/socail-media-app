import React from "react";
import Profile from "../../components/profile/Profile";
import Friends from "../../components/friends/Friends";

const Home = () => {
  return (
    <div className=" grid grid-cols-[1fr_2fr_1fr] gap-3 w-full h-screen p-3 pt-4">
      <aside className="rounded-lg">
        <Profile />
        <Friends/>
      </aside>
      <main className="bg-yellow-500  "></main>
      <aside className="bg-green-700  "></aside>
    </div>
  );
};

export default Home;
