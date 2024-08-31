import React from "react";
import person from "../../assets/images/person.jpg";
import { MdPersonAddAlt1 } from "react-icons/md";

const FriendList = () => {
  return (
    <div className="flex items-center gap-4 mb-2 ">
      <img src={person} alt="Profile" className="w-10 h-10 rounded-full" />
      <div className="flex-grow">
        <h1 className="text-[14px] font-[500] opacity-95">Sreeraj</h1>
        <p className="text-[12px] text-gray-600 dark:text-gray-300 opacity-80">
          No profession
        </p>
      </div>
      {/* <div>
        <button className="border border-gray-400 px-2 py-[2px] rounded-full text-[11px] mr-2 dark:bg-gray-600 bg-gray-300">
          Accept
        </button>
        <button className="border px-2 py-[2px]  rounded-full text-[11px]  ">
          Deny
        </button>
      </div> */}
      <div className="">
        <MdPersonAddAlt1 className="text-lg cursor-pointer text-blue-700"/>
      </div>
    </div>
  );
};

export default FriendList;
