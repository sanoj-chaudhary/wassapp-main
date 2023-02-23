import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Join from './component/join/Join';
import Chat from './component/chat/Chat';

function App() {


  return (
    <BrowserRouter>
     
      <Routes>
          <Route exact path="/" element={<Join />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
