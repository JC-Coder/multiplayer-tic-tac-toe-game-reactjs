import React, { useEffect, useRef, useState } from 'react';
import circleIcon from '../assets/circle.png';
import crossIcon from '../assets/cross.png';
import { useNavigate } from 'react-router-dom';

const initialData = Array(9).fill('');

const Play = () => {
  const [data, setData] = useState(initialData);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [circleScore, setCircleScore] = useState(0);
  const [crossScore, setCrossScore] = useState(0);
  const [winner, setWinner] = useState(null);
  const [player, setPlayer] = useState(crossIcon);
  const [gameStart, setGameStart] = useState(true);
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);

  useEffect(() => {
    const players = [crossIcon, circleIcon];
    const randomIndex = Math.floor(Math.random() * players.length);
    setPlayer(players[randomIndex]);
  }, []);

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
    console.log({ index });
    if (lock || data[index] !== '') {
      return;
    }

    const newData = [...data];
    // newData[index] = count % 2 === 0 ? 'x' : 'o';
    if (player === crossIcon) {
      newData[index] = 'x';
      setPlayer(circleIcon);
    } else {
      newData[index] = 'o';
      setPlayer(crossIcon);
    }

    setData(newData);
    setCount(count + 1);
    checkWin(newData);
    // setCurrentPlayer(prev => !prev)
  };

  const checkWin = (currentData) => {
    console.log('checkWin', currentData);

    if (!currentData.includes('')) {
      console.log('draw');
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

  const endGame = () => {
    navigate('/');
    // setLock(false);
    // setData(initialData);
    // setCircleScore(0);
    // setCrossScore(0);
  };

  const nextGame = () => {
    if (data.includes('') && !winner ) {
        return;
    }

    setWinner(null);
    setLock(false);
    setData(initialData);
  };

  return (
    <div className=" flex flex-col items-center justify-center space-y-6 h-[98vh] overflow-hidden">
      <div>
        <div
          className={`text-5xl font-bold flex justify-center items-center space-x-3 ${
            gameStart && !winner ? 'visible' : 'hidden'
          }`}
        >
          <img className={'w-10 h-10'} src={player} />
          <span>Turn</span>
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

        {/* <h1 className="text-5xl font-bold" ref={titleRef}>
          Tic Tac Toe Game In <br />{' '}
          <span className="text-[#26ffcb]">React</span>
        </h1> */}

        {/* {!gameStart && (
          <>
            {winner === 'draw' && (
              <>
                <div className="text-5xl font-bold flex justify-center items-center space-x-3">
                  <span> It's A Tie </span>
                </div>
              </>
            )}
        
            </>
}
            <>
            {winner !== null ? (
                  <>
                    {' '}
                    <div className="text-5xl font-bold flex justify-center items-center space-x-3">
                      <span>Winner :</span>{' '}
                      <img className={'w-10 h-10'} src={winner} />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold" ref={titleRef}>
                  Tic Tac Toe Game In <br />{' '}
                  <span className="text-[#26ffcb]">React</span>
                </h1>
              </>
            )}
          </>
        )} */}
      </div>

      <div className="flex items-center justify-center space-x-3 pt-4">
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
          waitingForOpponent ? 'visible' : 'hidden'
        }`}
      >
        Waiting for opponent .....{' '}
      </p>

      <div className="actionButtons">
        <button
          className={'button-1 bg-[#1f3540] text-[#26ffcb]'}
          onClick={endGame}
        >
          EndGame
        </button>
        <button
          className={'button-1 bg-[#27ffcb] text-black'}
          onClick={nextGame}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Play;
