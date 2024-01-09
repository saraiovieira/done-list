import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHeader from "./Components/MainHeader";
import DoneHeader from "./Components/DoneHeader";
import Welcome from "./Pages/Welcome/Welcome.jsx";
import Login from "./Pages/Login/Login.jsx";
import PrivateRoute from "./Pages/PrivateRoute";
import DoneList from "./Pages/DoneList/DoneList.jsx";
// import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={[<MainHeader key="mainHeader" />, <Welcome  key="welcome" />]} />
        <Route path="/login" element={[<MainHeader key="mainHeader" />, <Login key="login" />]} />
        <Route element={<PrivateRoute />}>
          <Route path="/donelist" element={[<DoneHeader key="doneHeader" />, <DoneList key="doneList" />]} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
