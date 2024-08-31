import React from "react";
import FriendList from "../friend list/FriendList";

const Friends = ({heading}) => {
  return (
    <div className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg  flex flex-col gap-0 mb-3  ">
      <section className="flex justify-between items-center font-medium opacity-95">
        <h1>{heading}</h1>
        <span>0</span>
      </section>
      <hr className="my-3"/>
      <FriendList/>
      <FriendList/>
      <FriendList/>
    </div>
  );
};

export default Friends;
