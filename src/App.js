import './App.css';
import {useState,useEffect} from 'react';
import Square from './Components/Square'
import {Patterns} from './Components/Patterns'

function App() {
  const [board,setBoard] = useState(["","","","","","","","",""]);
  const [player,setPlayer] = useState("O");
  const [result,setResult] = useState({winner:'none',state:'none'});

  useEffect(()=>{
    checkWin();
    checkTie();

    if (player === "X") {
      setPlayer("O")
    } else {
      setPlayer("X")
    }
    checkWin();
  },[board]);

  useEffect(()=>{
    if(result.state !=="none"){
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame();  
    }
  },[result])
  const chooseSquare = (square) => {
    setBoard(board.map((val,idx)=>{
      if(idx===square && val=== ""){
        return player;
      }
      return val;
    })
  );
    
};

const checkTie = () => {
  let filled = true;
  board.forEach((square)=>{
    if(square===""){
      filled = false;
    }
  });
  if(filled){
    setResult({winner:"No one",state:"Tie"});
  }
}

const restartGame = () => {
  setBoard(["", "", "", "", "", "", "", "", ""]);
  setPlayer("O");
};


const checkWin = () => {
  Patterns.map((currPatterns)=>{ 
    const firstPlayer = board[currPatterns[0]];
    if (firstPlayer === "") return;
    let foundWinningPattern = true;
    currPatterns.forEach((idx)=>{
      if(board[idx] !== firstPlayer){
        foundWinningPattern = false;
      }
    });
    if(foundWinningPattern){
      setResult({winner:player,state:'won'})
    }
  })
}

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square chooseSquare={()=>{chooseSquare(0)}} val={board[0]}/>
          <Square chooseSquare={() => {chooseSquare(1)}} val={board[1]}/>
          <Square chooseSquare={() => {chooseSquare(2)}} val={board[2]}/>
        </div>
        <div className="row">
          <Square chooseSquare={() => { chooseSquare(3) }} val={board[3]} />
          <Square chooseSquare={() => { chooseSquare(4) }} val={board[4]} />
          <Square chooseSquare={() => { chooseSquare(5) }} val={board[5]} />
        </div>
        <div className="row">
          <Square chooseSquare={() => { chooseSquare(6) }} val={board[6]} />
          <Square chooseSquare={() => { chooseSquare(7) }} val={board[7]} />
          <Square chooseSquare={() => { chooseSquare(8) }} val={board[8]} />
        </div>
      </div>
    </div>
  );
}

export default App;
