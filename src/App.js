import { click } from "@testing-library/user-event/dist/click";
import React , { useEffect, useState } from "react";
import "./style.css"

const App = () => {
  
  const [doorsNo, setDoorsNo] = useState(3)
  const [doors, setDoors] = useState([])
  const [rightDoor, setRightDoor] = useState(-1);
  
  const [choice, setChoice] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [notRevealDoor,setNotRevealDoor]= useState(-1);

  const [submitted, setSubmitted] = useState(false);
  const [info, setInfo] = useState("");

  // for displaying statistics
  const [totalSwitchPlays, setTotalSwitchPlays] = useState(0);
  const [totalStayPlays, setTotalStayPlays] = useState(0);
  const [totalSwitchWins, setTotalSwitchWins] = useState(0);
  const [totalStayWins, setTotalStayWins] = useState(0);


  function initializeGame(){
    const idx = Math.floor(Math.random()*doorsNo);
    setRightDoor(idx)
    let temp = []
    for(let i=0;i<doorsNo;i++){
      if(i===idx){
        setDoors([...temp, "🐯"])
        temp.push("🐯")
      }else{
        setDoors([...temp,"😫"])
        temp.push("😫")
      }
    }

    setChoice(null);
    setClicked(false);
    setNotRevealDoor(-1);
    setSubmitted(false);
    setInfo("")
  }

  useEffect(()=>{
    initializeGame()
  },[])

  function revealDoor(idx){
    if (idx===rightDoor){
      let temp = idx;
      while(temp===idx){
        temp = Math.floor(Math.random()*doorsNo)
      }
      setNotRevealDoor(temp);
    }else{
      setNotRevealDoor(rightDoor);
    }

    setChoice(idx);
    setClicked(true)
  }

  function giveResult(idx, state){
    setSubmitted(true)
    if(idx === rightDoor){
      setInfo("You Won!!")
      if (state === "switch"){
        setTotalSwitchWins(totalSwitchWins+1)
      }else if (state === "stay"){
        setTotalStayWins(totalStayWins+1)
      }
    }else{
      setInfo("You Lost!")
    }
  }
  
  return(
    <div className="container">
      <h1 className="heading">The Monty Hall Problem</h1>

      <div className="door-div">
        {doors.map((e, idx)=>{
          return(
            <div className="door-sub-div">
              {clicked?
              <button className="door-btn" id={choice===idx?"choosen-door":"normal-door"}>
                {submitted? 
                  <span>{doors[idx]}</span>:
                  <span>
                    {idx!==choice && idx!==notRevealDoor && <span>😫</span>}
                  </span>
                }
              </button>
              :
                <button
                onClick={()=>{
                  revealDoor(idx)
                }} 
                className="door-btn"></button>
              }
            </div>
          )
        })}
      </div>

      <div className="info-div">
        <div className="info-div-element">
          <span className="info-div-element-1">Total Switches:</span> 
          <span id="info-element-number" className="info-div-element-2">{totalSwitchPlays}</span>
        </div>
        <div className="info-div-element">
          <span className="info-div-element-1">Switch Win Percentage:</span>
          <span id="info-element-percentage" className="info-div-element-2">{(totalSwitchWins*100)/totalSwitchPlays}%</span>
        </div>
        <div className="info-div-element">
          <span className="info-div-element-1">Total Stays:</span>
          <span id="info-element-number" className="info-div-element-2">{totalStayPlays}</span>
        </div>
        <div className="info-div-element">
          <span className="info-div-element-1">Stay Win Percentage:</span> 
          <span id="info-element-percentage" className="info-div-element-2">{(totalStayWins*100)/totalStayPlays}%</span>
        </div>
      </div>


      <div className="game-controls-div">
        <div>
          {clicked &&
          <div>
            <button 
            className="game-control-btns"
            id={submitted?"no-cursor-btns":"cursor"}
            onClick={()=>{
              if(!submitted){
                setChoice(notRevealDoor);
                giveResult(notRevealDoor, "switch");
                setTotalSwitchPlays(totalSwitchPlays+1)
              }
            }}>Switch</button>
            <button
            className="game-control-btns"
            id={submitted?"no-cursor-btns":"cursor"} 
            onClick={()=>{
              if(!submitted){
                giveResult(choice, "stay")
                setTotalStayPlays(totalStayPlays+1)
              }
            }}>Stay</button>  
          </div>}

          {submitted &&
          <div>
            <button 
            className="replay-btn"
            onClick={()=>{
              initializeGame()
            }}>Replay</button>  
          </div>}
        </div>

        <div className="result-div">
          {submitted && <p className="result">{info}</p>}
        </div>
      </div>

    </div>
  )
}


export default App;