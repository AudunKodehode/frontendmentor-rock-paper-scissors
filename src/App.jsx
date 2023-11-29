import "./App.css";
import iconpaper from "/src/images/icon-paper.svg";
import iconscissors from "/src/images/icon-scissors.svg";
import iconrock from "/src/images/icon-rock.svg";
import rpslogo from "/src/images/logo.svg";
import rules from "/src/images/image-rules.svg";
import closeicon from "/src/images/icon-close.svg";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [cpuChoice, setCpuChoice] = useState("");
  const [gameState, setGameState] = useState(0);
  const [modal, setModal] = useState(false);
  function rps() {
    const choices = ["rock", "paper", "scissors"];
    let computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setCpuChoice(computerChoice);
    console.log(computerChoice);
    return computerChoice;
  }
  function roll(player) {
    if (gameState === 0) {
      setGameState(1);
      let paperButton = document.getElementById("paperButton");
      let scissorsButton = document.getElementById("scissorsButton");
      let rockButton = document.getElementById("rockButton");
      let resultsContainer = document.querySelector(".resultsContainer");
      let triangleBg = document.querySelector(".triangleBg");
      let cpuchoice = document.querySelector(".cpuchoice");
      let cpuchoiceshadow = document.querySelector(".cpuchoiceshadow");
      let picks = document.querySelector(".picks");

      let computer = rps();
      document
        .getElementById(`${player}Button`)
        .classList.add(`activeChoice${player}`);


      rockButton.style.zIndex = 9;
      paperButton.style.zIndex = 9;
      scissorsButton.style.zIndex = 9;
      if (player == "rock") {
        rockButton.style.zIndex = 10;
        paperButton.classList.add("fadeOut");
        scissorsButton.classList.add("fadeOut");
      } else if (player == "paper") {
        paperButton.style.zIndex = 10;
        rockButton.classList.add("fadeOut");
        scissorsButton.classList.add("fadeOut");
      } else if (player == "scissors") {
        scissorsButton.style.zIndex = 10;
        paperButton.classList.add("fadeOut");
        rockButton.classList.add("fadeOut");
      }

      if (computer === player) {
        setResult("Draw");
      } else if (
        (computer === "rock" && player === "paper") ||
        (computer === "paper" && player === "scissors") ||
        (computer === "scissors" && player === "rock")
      ) {
        setResult("You win");
        setScore(score + 1);
      } else {
        setResult("You lose");
        setScore(score - 1);
      }
      cpuchoice.classList.add(`${computer}Color`);
      picks.classList.add("fadeIn4");
      resultsContainer.classList.add("fadeIn2");
      triangleBg.classList.add("fadeOut");
      cpuchoice.classList.add("fadeIn2");
      cpuchoiceshadow.classList.add("fadeIn3");
    }
  }

  function removeClass(classname) {
    const root = document.getElementById("root");
    const fadeOutElements = root.querySelectorAll(`.${classname}`);
    fadeOutElements.forEach((element) => {
      element.classList.remove(classname);
    });
  }
  function newGame() {
    setGameState(0);
    removeClass("fadeOut");
    removeClass("fadeIn1");
    removeClass("fadeIn2");
    removeClass("fadeIn3");
    removeClass("fadeIn4");
    removeClass("activeChoicerock");
    removeClass("activeChoicescissors");
    removeClass("activeChoicepaper");
  }

  function toggleModal() {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  return (
    <>
      <button className="rulesButton" onClick={() => toggleModal()}>
        RULES
      </button>

      {modal === true ? (
        <div className="rulesModal">
          <h1 className="modalText">RULES</h1>
          <img src={rules} alt="" className="modalImage" />
          <button className="closeModal" onClick={() => toggleModal()}>
            <img src={closeicon} alt="" />
          </button>
          <button className="closeModalAlt" onClick={() => toggleModal()}>
            <img src={closeicon} alt="" />
          </button>

        </div>
      ) : (
        ""
      )}

      <div className="picks">
        <h3 className="you">YOU PICKED</h3>
        <h3 className="house">THE HOUSE PICKED</h3>
      </div>
      <div className="topcontainer">
        <img src={rpslogo} alt="" />
        <div className="scorecontainer">
          <h3>SCORE</h3>
          <h1 id="score">{score}</h1>
        </div>
      </div>
      <div className="triangleBg"></div>

      <div className="choices">
        <button
          id="paperButton"
          className="choice paper paperColor"
          onClick={() => roll("paper")}
        >
          <div className="choicecontainer">
            <img src={iconpaper} alt="" />
          </div>
        </button>
        <button
          id="rockButton"
          className="choice rock rockColor"
          onClick={() => roll("rock")}
        >
          <div className="choicecontainer">
            <img src={iconrock} alt="" />
          </div>
        </button>

        <button
          id="scissorsButton"
          className="choice scissors scissorsColor"
          onClick={() => roll("scissors")}
        >
          <div className="choicecontainer">
            <img src={iconscissors} alt="" />
          </div>
        </button>

        <div className="cpuchoice choice">
          <div className="choicecontainer">
            {cpuChoice === "rock" && <img src={iconrock} alt="" />}
            {cpuChoice === "paper" && <img src={iconpaper} alt="" />}
            {cpuChoice === "scissors" && <img src={iconscissors} alt="" />}
          </div>
        </div>
        <div className="cpuchoiceshadow choice"></div>
      </div>
      <div className="resultsContainer">
        <h1>{result}</h1>
        <button className="playAgainButton" onClick={() => newGame()}>
          PLAY AGAIN
        </button>
      </div>
    </>
  );
}

export default App;
