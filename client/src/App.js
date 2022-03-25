import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainHeader from './components/MainHeader';
import DoneHeader from './components/DoneHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';
import DoneList from './pages/DoneList';
import NotFound from './pages/NotFound';


function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={[<MainHeader />, <Home />]} />
        <Route path="/login" element={[<MainHeader />, <Login />]} />
        <Route path="/register" element={[<MainHeader />, <Register />]} />
        <Route element={<PrivateRoute />}>
          <Route path="/donelist" element={[<DoneHeader />, <DoneList />]}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
