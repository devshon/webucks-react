import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../src/styles/Reset.scss";
import "../src/styles/Common.scss";

import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Detail from "./pages/detail/Detail";
import Signup from "./pages/signup/Signup";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
