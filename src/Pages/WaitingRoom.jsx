import React from 'react';
import { useNavigate } from 'react-router-dom';

const WaitingRoom = () => {
  const navigate = useNavigate();

  return (
    <div className={'container flex items-center justify-center h-[98vh]'}>
      <section
        className={
          'h-[60vh] w-[300px] md:w-[450px] bg-[#224353] rounded-md shadow-md flex flex-col p-4 justify-between items-center text-center'
        }
      >
        <div>
          <h2 className={'text-3xl font-bold text-white'}>
            Waiting For Opponent{' '}
          </h2>
          <p className={'p-4'}>
            Game will start once someone join using your invite code{' '}
          </p>
        </div>

        <div class="flex items-center justify-center">
          <div class="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-12 w-12"></div>
        </div>

        <div>
          <button
            className="button-1 bg-[#0f1b21] text-white"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>
        </div>
      </section>
    </div>
  );
};

export default WaitingRoom;
