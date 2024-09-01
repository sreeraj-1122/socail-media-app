import React from "react";
import Profile from "../../components/profile/Profile";
import Friends from "../../components/friends/Friends";
import CreatePost from "../../components/Create post/CreatePost";
import Post from "../../components/post/Post";

const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-3 w-full h-screen lg:px-2 p-0 ">
      <aside className="rounded-lg hidden lg:block">
        <Profile />
        <Friends heading="Friends" />
      </aside>
      <main className="overflow-scroll custom-scrollbar rounded-lg shadow-custom-dark dark:bg-black">
        <CreatePost />
        <Post />
        <Post />
        <Post />
        <Post />
      </main>
      <aside className="hidden lg:block">
        <Friends heading="Friend Request" />
        <Friends heading="Friend Suggestion" />
      </aside>
    </div>
  );
};

export default Home;
