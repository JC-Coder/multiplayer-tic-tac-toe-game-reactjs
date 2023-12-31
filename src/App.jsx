import './App.css';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Play from './Pages/Play';
import WaitingRoom from './Pages/WaitingRoom';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './Util/action';
import { APP_CONSTANTS } from './Util/constants';

function App() {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);

  console.log('socket from store', socket);

  useEffect(() => {
    if (!socket) {
      const newSocket = io(APP_CONSTANTS.baseUrl);

      newSocket.on('connect', () => {
        console.log('connected', newSocket);

        dispatch(setSocket({ data: newSocket }));
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
        dispatch(setSocket(null));
      });
    }

    return () => {
      if (socket) {
        console.log('return socket', socket);
        // socket.data.disconnect();
        dispatch(setSocket(null));
      }
    };
  }, [socket, dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/play" element={<Play />}></Route>
        <Route path="/waiting" element={<WaitingRoom />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
