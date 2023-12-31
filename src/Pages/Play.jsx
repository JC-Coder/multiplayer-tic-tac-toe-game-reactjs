import React, { useEffect, useRef, useState } from 'react';
import circleIcon from '../assets/circle.png';
import crossIcon from '../assets/cross.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BgMusic from '../assets/bg-music.mp3';
import { GiSoundOn } from 'react-icons/gi';
import { GiSoundOff } from 'react-icons/gi';

const initialData = Array(9).fill('');

const Play = () => {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [circleScore, setCircleScore] = useState(0);
  const [crossScore, setCrossScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState(false);
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket);
  const [bgMusic, setBgMusic] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState();
  const bgMusicRef = useRef(null);

  useEffect(() => {
    if (soundEnabled) {
      bgMusicRef.current.play();
    } else {
      bgMusicRef.current.pause();
    }
  }, [soundEnabled]);

  /**
   * audio handlers end
   */

  /**
   * game play socket start
   */
  useEffect(() => {
    if (socket) {
      // listeners

      // set player value
      socket.data.on('setPlayer', (data) => {
        setPlayer(data);
      });

      // set starting player
      socket.data.on('startingPlayer', () => {
        setCurrentPlayer(true);
      });

      // toggle event
      socket.data.on('toggle', (data) => {
        setData(data);
        checkWin(data);
        setCurrentPlayer(true);
      });

      // next game
      socket.data.on('nextGame', () => {
        setWinner(null);
        setLock(false);
        setData(initialData);
        setCurrentPlayer(false);
      });

      // end game
      socket.data.on('endGame', () => {
        window.alert('Opponent has ended game , redirecting to homepage ...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      });

      // opponent left
      socket.data.on('opponentLeft', () => {
        window.alert('Opponent has left the room');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      });

      // socket disconnect
      socket.data.on('disconnect', () => {
        navigate('/');
      });
    }
  }, [socket, dispatch]);

  /**
   * game play socket end
   */

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6] // Diagonals
  ];

  const toggle = (index) => {
    if (lock || data[index] !== '') {
      return;
    }

    const newData = [...data];
    if (player === 'x') {
      newData[index] = 'x';
      socket.data.emit('nextPlayer');
    } else {
      newData[index] = 'o';
      socket.data.emit('nextPlayer');
    }

    if (socket) {
      socket.data.emit('toggle', newData);
    }

    setData(newData);
    setCount(count + 1);
    checkWin(newData);
    setCurrentPlayer(false);
    if (soundEnabled === undefined) {
      setSoundEnabled(true);
    }
  };

  const checkWin = (currentData) => {
    if (!currentData.includes('')) {
      // Check for a draw
      setLock(true);
      setWinner('draw');
      // Set draw message
      return;
    }

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentData[a] &&
        currentData[a] === currentData[b] &&
        currentData[a] === currentData[c]
      ) {
        won(currentData[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);

    if (winner === 'x') {
      setWinner(crossIcon);
      setCrossScore((prev) => prev + 1);
    } else {
      setWinner(circleIcon);
      setCircleScore((prev) => prev + 1);
    }
  };

  const nextGame = () => {
    if (data.includes('') && !winner) {
      return;
    }

    if (socket) {
      const winnerData = winner === crossIcon ? 'x' : 'o';
      socket.data.emit('nextGame', winnerData);
    }

    setWinner(null);
    setLock(false);
    setData(initialData);
    setCurrentPlayer(false);
  };

  const endGame = () => {
    const res = prompt('Do you want to end game , yes / no?');
    if (res.trim().toLowerCase() === 'yes') {
      navigate('/');
      if (socket) {
        socket.data.emit('endGame');
      }
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center space-y-4 h-[98vh] overflow-hidden mt-[-2rem] md:mt-0">
      <div>
        <div
          className={`text-3xl md:text-5xl font-bold flex justify-center items-center space-x-3 ${
            !winner ? 'visible' : 'hidden'
          }`}
        >
          {/* <img className={'w-10 h-10'} src={player} /> */}
          <span>{currentPlayer ? 'Your' : 'Opponent'} Turn</span>
        </div>

        <div
          className={`text-5xl font-bold flex justify-center items-center space-x-3 ${
            winner === 'draw' ? 'visible' : 'hidden'
          }`}
        >
          <span> It's A Tie </span>
        </div>

        <div
          className={`text-5xl font-bold flex justify-center items-center space-x-3 ${
            winner !== 'draw' && winner ? 'visible' : 'hidden'
          }`}
        >
          <span>Winner :</span> <img className={'w-10 h-10'} src={winner} />
        </div>
      </div>

      <div className="flex items-center justify-center space-x-3 pt-0 pb-2 ">
        {/* <p className={'label text-3xl text-red-400'}>O</p> */}
        <img src={circleIcon} className={'w-10 h-10'} />
        <h3 className={'text-3xl font-bold'}>{circleScore}</h3>

        <span className="divider"> - </span>

        <h3 className={'text-3xl font-bold'}>{crossScore}</h3>
        <img src={crossIcon} className={'w-10 h-10'} />
        {/* <h3 className="label">X</h3> */}
      </div>

      <section
        id="board"
        className={
          'flex items-center justify-center h-[300px] w-[300px] md:w-[564px] m-auto pb-6 md:pb-0'
        }
      >
        <div className="row1">
          {[0, 1, 2].map((index) => (
            <div
              className={`boxes rounded-md h-[100px] w-[100px] bg-[#1f3540] border border-1 border-[#0f1b21]  flex p-4   ${
                !currentPlayer ? 'pointer-events-none' : 'cursor-pointer'
              }`}
              key={index}
              onClick={() => currentPlayer && toggle(index)}
            >
              {data[index] === 'x' && <img src={crossIcon} alt="" />}
              {data[index] === 'o' && <img src={circleIcon} alt="" />}
            </div>
          ))}
        </div>
        <div className="row2">
          {[3, 4, 5].map((index) => (
            <div
              className={`boxes rounded-md h-[100px] w-[100px] bg-[#1f3540] border border-1 border-[#0f1b21]  flex p-4   ${
                !currentPlayer ? 'pointer-events-none' : 'cursor-pointer'
              }`}
              key={index}
              onClick={() => currentPlayer && toggle(index)}
            >
              {data[index] === 'x' && <img src={crossIcon} alt="" />}
              {data[index] === 'o' && <img src={circleIcon} alt="" />}
            </div>
          ))}
        </div>
        <div className="row3">
          {[6, 7, 8].map((index) => (
            <div
              className={`boxes rounded-md h-[100px] w-[100px] bg-[#1f3540] border border-1 border-[#0f1b21]  flex p-4   ${
                !currentPlayer ? 'pointer-events-none' : 'cursor-pointer'
              }`}
              key={index}
              onClick={() => currentPlayer && toggle(index)}
            >
              {data[index] === 'x' && <img src={crossIcon} alt="" />}
              {data[index] === 'o' && <img src={circleIcon} alt="" />}
            </div>
          ))}
        </div>
      </section>
      <p
        className={`text-gray-300 text-1xl ${
          !currentPlayer && !winner ? 'visible' : 'hidden'
        }`}
      >
        Waiting for opponent .....{' '}
      </p>

      <div className="actionButtons">
        <button
          className={'button-1-md bg-[#1f3540] text-[#26ffcb]'}
          onClick={endGame}
        >
          EndGame
        </button>
        <button
          className={'button-1-md bg-[#27ffcb] text-black'}
          onClick={nextGame}
        >
          Continue
        </button>
      </div>

      {/* audios start */}
      <audio ref={bgMusicRef} src={BgMusic} loop={true} />

      <GiSoundOn
        className={`size-14 absolute top-2 left-4 md:top-3 md:left-6 bg-[#173c50] p-1 text-white rounded-full cursor-pointer ${
          soundEnabled ? 'visible' : 'hidden'
        }`}
        onClick={() => {
          setSoundEnabled(false);
        }}
      />

      <GiSoundOff
        className={`size-14 absolute top-2 left-4 md:top-3 md:left-6  bg-[#173c50] p-1 text-white rounded-full cursor-pointer ${
          !soundEnabled ? 'visible' : 'hidden'
        }`}
        onClick={() => {
          setSoundEnabled(true);
        }}
      />

      {/* audios end */}
    </div>
  );
};

export default Play;
