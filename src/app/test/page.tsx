"use client";

//import Company from "./Company";
import ReactRating from "react-stars";

import { useState } from "react";

function TestCom() {
  const [comment, setComment] = useState("");
  const maxCharacters = 100;

  const handleChange = (event: any) => {
    const inputComment = event.target.value;
    if (inputComment.length <= maxCharacters) {
      setComment(inputComment);
    }
  };
  return (
    <div className="w-[650px] max-h-[500px] px-8 py-3 bg-red-400 flex flex-col  text-primary rounded-20 overflow-auto ">
      {/* top section  */}
      <div className="flex  justify-center items-center ">
        <div className=" flex flex-col w-2/3 mr-3">
          {/*  card  */}
          <div className="flex  items-center">
            <div className="mr-8"></div>
            <div className=" flex flex-col">
              <div>
                <p className="text-2xl font-bold whitespace-nowrap">
                  Employee Name
                </p>
              </div>

              <div className="bg-costumGreen py-1 px-2 mt-2  w-max rounded-full ">
                <p className="text-sm">Category</p>
              </div>
            </div>
          </div>
          {/* about company  */}
          <div className="mt-5 w-auto">
            <p className="text-xl font-bold mb-1">About Employee</p>
            <p className="text-xs leading-normal">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequuntur, incidunt! Molestias harum debitis culpa animi illum
              quaerat modi expedita? Voluptatibus quae aliquam voluptates
              pariatur, tempore soluta architecto voluptatum distinctio dolores?
            </p>
          </div>

          <div className="h-[0.5px]  border   border-lightGry w-[350px] mt-3 "></div>
          {/* posts  */}
          <div className="flex flex-col ">
            <div className="flex justify-between items-center mt-1">
              <p className="text-xl font-bold  inline">Available Posts</p>
              <p className="text-xs inline mr-4 ">5 Open Posts</p>
            </div>
            <div className="flex mt-2 justify-between"></div>
          </div>

          <div className="h-[0.5px]  border   border-lightGry w-[350px] mt-3 "></div>
        </div>
        <div className="flex flex-col  w-1/3">
          <div className="flex justify-evenly ">
            <div className="bg-primary rounded-20 px-3 py-0 flex justify-between items-center ">
              <ReactRating
                count={5}
                size={20}
                color2={"#1AD3A7"}
                value={3}
                edit={false}
              />
              <p className="text-white">3.0</p>
            </div>
            <div></div>
          </div>

          {/* info  */}
          <div className="flex  flex-col  mt-4 rounded-20 px-6 py-6 bg-slate-600 w-1/3">
            <div className="flex items-start mb-4 ">
              <div></div>
              <div>
                <p className="text-[12px] font-bold">Location</p>
                <p className="text-[10px]">something</p>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div></div>
              <div>
                <p className="text-[12px] font-bold">Founded date</p>
                <p className="text-[10px]">something</p>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div></div>
              <div>
                <p className="text-[12px] font-bold">Company size</p>
                <p className="text-[10px] ">something</p>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div></div>
              <div>
                <p className="text-[12px] font-bold">Available posts</p>
                <p className="text-[10px]">something</p>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div></div>
              <div>
                <p className="text-[12px] font-bold">Email</p>
                <p className="text-[10px]">something</p>
              </div>
            </div>

            <div className="flex items-start mb-4">
              <div></div>
              <div>
                <p className="text-[12px] font-bold">Phone number</p>
                <p className="text-[10px]">something</p>
              </div>
            </div>

            <div className="flex  justify-center mt-6 "></div>
          </div>
        </div>
      </div>

      {/* bottom section  */}
      <div className="flex ">
        {/* comments and reviews  */}
        <div className="mt-1 flex flex-col  w-3/4 bg-slate-700 ">
          <div className="flex justify-between items-center mt-1 w-full">
            <p className="text-xl font-bold  inline">Comments & Reviews</p>
            <p className="text-xs inline mr-4 ">5Comments</p>
          </div>
          {/* les boites de commentaires  */}
          <div className="flex  w-full justify-between ">
            <div className=" h-20 w-full bg-white flex px-4 py-4">
              <div></div>
              <div>
                <p>user name</p>
              </div>
              {/* review  */}
              <div className=" flex ">
                <p>4.0</p>
                <ReactRating />
              </div>
            </div>
          </div>
        </div>

        {/* feedback */}
        <div className="bg-slate-600 rounded-20 px-3 py-2 mt-4  w-1/3 ">
          <div className="flex justify-between items-center">
            <p className="text-[11px]  font-medium ">Add a review</p>
            <div className="">
              <ReactRating />
            </div>
          </div>
          <div className="w-auto flex flex-col ">
            <input
              placeholder="Your name"
              className="m-1 h-7 w-5/4 rounded text-xs px-2  text-justify"
            ></input>
            <input
              placeholder="Email address"
              className="m-1 h-7 w-5/4 rounded text-xs px-2  text-justify"
            ></input>
          </div>
          <div className="flex justify-between items-start mt-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <p className="text-[10px] ml-2">
              Remember my name and email for the next time I comment
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <textarea
              className="text-[10px] h-20 p-1 w-full"
              value={comment}
              onChange={handleChange}
              placeholder="Enter your comment..."
              maxLength={maxCharacters}
            />

            <div className="mt-2">
              <button className="bg-primary rounded-lg text-costumGreen  font-semibold  px-6 w-full text-[10px] py-1 content-center">
                Submit your review
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/3 h-2/3">{/* rating  */}</div>
    </div>
  );
}
export default TestCom;
