import React from "react";
import Profile from "../../components/profile/Profile";
import Friends from "../../components/friends/Friends";
import CreatePost from "../../components/Create post/CreatePost";
import Post from "../../components/post/Post";

const Home = () => {
  return (
    <div className=" grid grid-cols-[1fr_2fr_1fr] gap-3 w-full h-screen p-3 pt-4 ">
      <aside className="rounded-lg">
        <Profile />
        <Friends heading="Friends" />
      </aside>
      <main className="">
        <CreatePost />
        <Post />
        <Post />
        <Post />
        <Post />
      </main>
      <aside className="  ">
        <Friends heading="Friend Request" />
        <Friends heading="Friend Suggestion" />
      </aside>
    </div>
  );
};

export default Home;
