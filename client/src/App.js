import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeader from "./Components/MainHeader";
import DoneHeader from "./Components/DoneHeader";
import Home from "./Pages/Home";
import PrivateRoute from "./Pages/PrivateRoute";
import DoneList from "./Pages/DoneList";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={[<MainHeader />, <Home />]} />
        <Route element={<PrivateRoute />}>
          <Route path="/donelist" element={[<DoneHeader />, <DoneList />]} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
