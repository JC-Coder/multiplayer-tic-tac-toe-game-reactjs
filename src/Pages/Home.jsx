import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let [createGame, setCreateGame] = useState(false);
  let [joinGame, setJoinGame] = useState(false);
  const navigate = useNavigate();

  const exist = () => {
    setCreateGame(false);
    setJoinGame(false);
  };

  const handleJoinGame = () => {
    navigate('/play');
  };

  const handleCreateGame = () => {
    navigate('/waiting');
  };

  return (
    <>
      <div className="flex flex-col h-[98vh] max-h-[98vh] overflow-hidden items-center justify-center">
        {/* home section */}
        <section className={createGame || joinGame ? 'hidden' : 'block'}>
          <div>
            <h1 className="text-6xl font-bold mb-9">
              Online Multiplayer Tic Tac Toe <br />{' '}
              <span className="text-yellow-500">Game</span>
            </h1>
          </div>

          <div className="flex items-center justify-center pt-9 space-x-6">
            <button
              className="button-1 bg-[#1f3540] text-[#26ffcb]"
              onClick={() => setCreateGame(true)}
            >
              Create Game
            </button>
            <button
              className="button-1 bg-[#27ffcb] text-black"
              onClick={() => setJoinGame(true)}
            >
              Join Game
            </button>
          </div>
        </section>

        {/* create game section */}
        <section className={!createGame && 'hidden'}>
          <h3 className={'text-4xl md:text-6xl text-white font-bold mb-9'}>
            Create New Game
          </h3>

          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-gray-300 outline-none focus:outline-none sm:max-w-md">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className={
                  'block flex-1 border-0 bg-transparent py-2 pl-3 text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6 outline-none'
                }
                placeholder="Enter Game Invitation Code"
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
                id="username"
                autoComplete="username"
                className={
                  'block flex-1 border-0 bg-transparent py-2 pl-3 text-white placeholder:text-gray-400 focus:ring-0 sm:text-md sm:leading-6 outline-none'
                }
                placeholder="Enter Game Code"
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
