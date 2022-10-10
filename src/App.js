import logo from './logo.svg';
import './App.css';

import React from 'react';


function X() {
  return (
    <svg
      className="anim"
      width="44"
      height="42"
      viewBox="0 0 44 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5.62476"
        width="52"
        height="6.54048"
        transform="rotate(45 5.62476 0)"
        fill="#D9D9D9"
      />
      <rect
        y="35.0598"
        width="52"
        height="6.54048"
        transform="rotate(-40.9194 0 35.0598)"
        fill="#D9D9D9"
      />
    </svg>
  );
}
function O() {
  return (
    <svg
      width="41"
      className="anim"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20.5" cy="20.5" r="18" stroke="white" stroke-width="5" />
    </svg>
  );
}




function App() {
  let [switchTurn, setSwitchTurn] = React.useState(false);
  let [lastTurn, setLastTurn] = React.useState("");
  let [gameOver, setGameover] = React.useState(false);
  let [shaking, setShaking] = React.useState(false);

  let [msg, setMsg] = React.useState("");

  let [buttons, setButtons] = React.useState([
    { value: null, once: false },
    { value: null, once: false },
    { value: null, once: false },
    { value: null, once: false },
    { value: null, once: false },
    { value: null, once: false },
    { value: null, once: false },
    { value: null, once: false },
    { value: null, once: false }
  ]);
  let [mask, setMask] = React.useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]);

  React.useEffect(() => {
    let chek = mask.some((comb) => {
      return comb.every((item) => {
        return buttons[item].value === lastTurn;
      });
    });

    let allClicked = buttons.every((item) => {
      return item.once == true;
    });

    setGameover((prev) => {
      if (chek) {
        return true;
      }
      if (allClicked === true) {
        return true;
      }
    });
    console.log(allClicked);
  }, [switchTurn]);
  return (
    <div className="App w-full h-screen bg-purple-800 overflow-auto border bg-gradient-to-r hue from-indigo-500 via-orange-400 to-orange-500">
      <div className="  bg-clip-text color  bg-gradient-to-b from-indigo-500 via-orange-400 to-orange-500 w-fit mx-auto my-14 p-5">
        <h1 className="text-4xl  color text-white font-bold">{msg}</h1>
      </div>
      <section className="flex mx-auto mt-[55px] p-5 bg-purple-  flex gap-2 flex-wrap items-center justify-center w-[400px]">
        {buttons.map((button, index) => {
          return (
            <button
              onClick={() => {
                if (!button.once) {
                  setButtons((prev) => {
                    return prev.map((b, i) => {
                      if (i == index) {
                        b.value = switchTurn ? "o" : "x";
                        b.once = true;
                      }
                      return b;
                    });
                  });
                  setLastTurn(switchTurn ? "o" : "x");
                  setSwitchTurn(!switchTurn);
                }
              }}
              className="w-[100px] test transition-all bounce border-white hover:bg-purple-900  flex items-center justify-center h-[100px] border border-black"
            >
              {button.value === "x" && <X />}
              {button.value === "o" && <O />}
            </button>
          );
        })}
      </section>
      {gameOver && (
        <button
          onClick={() => {
            setGameover(false);
            setMsg("");
            setButtons((prev) => {
              return prev.map((b) => {
                b.value = null;
                b.once = false;
                return b;
              });
            });
          }}
          className="py-2 px-5 mt-16 border text-white bg-indigo-500"
        >
          Reset game
        </button>
      )}
    </div>
  );
}

export default App;
