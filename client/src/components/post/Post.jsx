import React from "react";
import person from "../../assets/images/person.jpg";
import nature from "../../assets/images/nature.jpg";

const Post = () => {
  return (
    <div className="shadow-custom-dark dark:bg-custom-bg w-full p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2 ">
        <img src={person} alt="Profile" className="w-10 h-10 rounded-full" />
        <div className="flex-grow ">
          <div className="flex justify-between">
            <h1 className="text-[14px] font-[500] opacity-95">Sreeraj</h1>
            <h2 className="text-[12px] font-[400] opacity-75">5 houres ago</h2>
          </div>
          <p className="text-[12px] text-gray-600 dark:text-gray-300 opacity-80">
            No profession
          </p>
        </div>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300  text-wrap flex flex-col gap-3 mt-3">
      <p className="opacity-80">Lorem ipsum  sit amet consectetur adipisicing elit. Expedita, laboriosam! Officiis, reprehenderit. Quibusdam et totam aliquam, nihil unde reprehenderit autem iure cum optio sit quas perferendis harum pariatur fugiat rem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum hic deleniti vitae voluptas repudiandae assumenda dolorem est alias provident aliquam obcaecati cum optio explicabo eligendi similique perferendis, quidem dignissimos magni.</p>

      <img src={nature} alt="" className="rounded-lg object-contain" />
      </div>
    </div>
  );
};

export default Post;
