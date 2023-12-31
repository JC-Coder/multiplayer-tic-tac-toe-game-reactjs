import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../Util/axios';
import { io } from 'socket.io-client';
import { APP_CONSTANTS } from '../Util/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from '../Util/action';

const Home = () => {
  let [createGame, setCreateGame] = useState(false);
  let [joinGame, setJoinGame] = useState(false);
  const [createGameInput, setCreateGameInput] = useState('');
  const [joinGameInput, setJoinGameInput] = useState('');
  const navigate = useNavigate();
  const [gameId, setGameId] = useState(null);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);

  useEffect(() => {
    if (socket) {
      // listeners

      socket.data.on('createGameRes', (data) => {
        console.log('createGameRes', data);

        if (data.success) {
          navigate('/waiting');
        }

        if (!data.success && data.message) {
          window.alert(data.message);
        }
      });

      socket.data.on('joinGameRes', (data) => {
        console.log('joinGameRes', data);

        if (data.success) {
          navigate('/play');
        }

        if (!data.success && data.message) {
          window.alert(data.message);
        }
      });
    }
  }, [socket, dispatch]);

  const exist = () => {
    setCreateGame(false);
    setJoinGame(false);
  };

  const handleJoinGame = () => {
    // navigate('/play');
    if (socket) {
      socket.data.emit('joinGame', {
        name: joinGameInput.toLocaleLowerCase()
      });
    }
  };

  const handleCreateGame = () => {
    if (socket) {
      socket.data.emit('createGame', {
        name: createGameInput.toLocaleLowerCase()
      });
    }
    // navigate('/waiting');
  };

  return (
    <>
      <div className="container flex flex-col h-[98vh] max-h-[98vh] overflow-hidden items-center justify-center">
        {/* home section */}
        <section className={`${createGame || joinGame ? 'hidden' : 'block'}`}>
          <div>
            <h1 className="text-2xl md:text-6xl font-bold mb-9 text-center">
              Online Multiplayer Tic Tac Toe <br />{' '}
              <span className="text-yellow-500">Game</span>
            </h1>
          </div>

          <div className="flex items-center justify-center pt-9 space-x-6">
            <button
              className=" bg-[#1f3540] text-[#26ffcb] px-6 py-3 rounded-2xl text-xl"
              onClick={() => setCreateGame(true)}
            >
              Create Game
            </button>
            <button
              className="px-6 py-3 rounded-2xl text-xl bg-[#27ffcb] text-black"
              onClick={() => setJoinGame(true)}
            >
              Join Game
            </button>
          </div>
        </section>

        {/* create game section */}
        <section className={`${!createGame && 'hidden'}`}>
          <h3 className={'text-4xl md:text-6xl text-white font-bold mb-9'}>
            Create New Game
          </h3>

          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-gray-300 outline-none focus:outline-none sm:max-w-md">
              <input
                type="text"
                name="username"
                autoComplete="username"
                className={
                  'block flex-1 border-0 bg-transparent py-2 pl-3 text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6 outline-none'
                }
                placeholder="Enter Game Invitation Code"
                onChange={(event) => setCreateGameInput(event.target.value)}
              />
            </div>
            <div className={'flex items-center justify-center space-x-4'}>
              <button
                className={
                  'bg-[#1f3540] hover:bg-[#182a32] text-[#26ffcb] mt-5 text-1xl md:text-2xl px-4 py-2 rounded-md font-bold'
                }
                onClick={handleCreateGame}
              >
                Create Game
              </button>
              <button
                className={
                  'bg-[#1f3540] hover:bg-[#182a32] text-[#26ffcb] mt-5 text-1xl md:text-2xl px-4 py-2 rounded-md font-bold'
                }
                onClick={exist}
              >
                Exit
              </button>
            </div>
          </div>
        </section>

        {/* join game section */}
        <section className={!joinGame && 'hidden'}>
          <h3 className={'text-4xl md:text-6xl text-white font-bold mb-9'}>
            Join New Game
          </h3>

          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-gray-300 outline-none focus:outline-none sm:max-w-md">
              <input
                type="text"
                name="username"
                autoComplete="username"
                className={
                  'block flex-1 border-0 bg-transparent py-2 pl-3 text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6 outline-none'
                }
                placeholder="Enter Game Code"
                onChange={(event) => setJoinGameInput(event.target.value)}
              />
            </div>
            <div className={'flex items-center justify-center space-x-4'}>
              <button
                className={
                  'bg-[#1f3540] hover:bg-[#182a32] text-[#26ffcb] mt-5 text-1xl md:text-2xl px-4 py-2 rounded-md font-bold'
                }
                onClick={handleJoinGame}
              >
                Join Game
              </button>
              <button
                className={
                  'bg-[#1f3540] hover:bg-[#182a32] text-[#26ffcb] mt-5 text-1xl md:text-2xl px-4 py-2 rounded-md font-bold'
                }
                onClick={exist}
              >
                Exit
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
