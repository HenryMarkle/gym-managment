"use client";

import React, { useState } from "react";
import { logIn, logOut } from "../../redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../redux/store";

function Page() {
  const [username, setUsername] = useState("");

  const userNumbersCount = useAppSelector((state) => state.auth.userNumbers);

  const dispatch = useDispatch<AppDispatch>();

  const onClickLogIn = () => {
    dispatch(logIn(username));
  };

  const onClickToggle = () => {};

  const onClickLogOut = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur,
          cum nulla vel sed harum quis quisquam molestiae aspernatur qui optio,
          atque excepturi. Cumque pariatur voluptatem eaque odio illo a sunt.
        </p>
        <input
          className="border-2"
          type="number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <button onClick={onClickLogIn}>Log in</button>
        <button onClick={onClickLogOut}>Log Out</button>
        <button onClick={onClickToggle}>Toggle</button>

        {userNumbersCount.map((ele) => {
          return <>{ele} ,,,</>;
        })}
      </div>
    </>
  );
}

export default Page;
