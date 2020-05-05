import React from "react";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import GamePage from "./pages/GamePage.jsx";

const Page = () => {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/game" exact component={GamePage} />
    </>
  );
};

export default Page;