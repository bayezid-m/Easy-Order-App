import React from 'react';
import { Route, Routes, BrowserRouter, } from 'react-router-dom'

import './App.css';
import DashBoard from './screens/DashBoard';
import Login from './screens/Login';
import Register from './screens/Register';
import ItemInfo from './screens/ItemInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/itemInfo/:id' element={<ItemInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
