const letterContainer=document.getElementById("letter-container");
const optionsContainer=document.getElementById("options-container");
const userInputSection=document.getElementById("user-input-section");
const newGameContainer=document.getElementById("new-game-container");
const newGameButton=document.getElementById("new-game-button");
const canvas=document.getElementById("canvas");
const resultText=document.getElementById("result-text");
const instructions=document.getElementById("instructions");

let winCount=0
let count=0
let chosenWord=""
let options={
    EASY:["Apple","Car","Dog","Wolf",
        "Orange","Lemon","Computer","Internet","Magic","Restaurant","Shop","School","Boots","Shoes","Country","Relatives","Family","peace","device","education","focus"],
    MEDIUM:["Raspberry","Blueberry",'microwave', 'electronic', 'wireless',"prophet","barrier","murder","enemy","remedy","knowledge","powerful","mindful","absence","matrix","onyx"],
    HARD:["conscientious","executioner","assassin","ivory","bookworm","pneumonia","jackpot","syndrome","transplant","medicine","abruptly","quartz","youthful","kitsch"],
};
const displayOptions=()=>{
    instructions.classList.remove("hide");
    instructions.innerHTML+=`<h5>Guess the hidden word by selecting letters, one at a time, before the stick
    figure is fully drawn. Select one of the levels:Easy,Medium,Hard .Keep in mind that you have only 8 chances!!</h5>`
    instructions.innerHTML+=`<h4>GOOD LUCK!</h4>`;
    optionsContainer.innerHTML+="<h3>HANGMAN GAME</h3>";
  let buttonCon=document.createElement("div");
  for(let value in options){
      buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

const blocker=()=>{
    let optionsButtons=document.querySelectorAll(".options");
    let letterButtons=document.querySelectorAll(".letters");
    optionsButtons.forEach((button)=>{
       button.disabled=true;
    });
    letterButtons.forEach((button)=>{
        button.disabled=true;
    });
    newGameContainer.classList.remove("hide");
};

const generateWord=(optionValue)=>{
  instructions.classList.add("hide");
  let optionsButtons=document.querySelectorAll(".options");
  optionsButtons.forEach((button)=>{
     if(button.innerText.toUpperCase()===optionValue){
         button.classList.add("active");//highlight
     }
     button.disabled=true;
  });
  letterContainer.classList.remove("hide");
  userInputSection.innerText="";
  let optionArray=options[optionValue];
  chosenWord=optionArray[Math.floor(Math.random()*optionArray.length)];
  chosenWord=chosenWord.toUpperCase();
  let displayItem=chosenWord.replace(/./g,'<span class="dashes">_</span>');
  userInputSection.innerHTML=displayItem;
};

const initializer=()=>{
    winCount=0;
    count=0;
    instructions.innerHTML="";
    userInputSection.innerText="";
    optionsContainer.innerHTML="";
    letterContainer.innerHTML="";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");

    for(let i=65;i<91;i++){
        let button=document.createElement('button');
        button.classList.add("letters");
        button.innerText=String.fromCharCode(i);
        button.addEventListener("click", ()=>{
                let charArray=chosenWord.split("");
                let dashes=document.getElementsByClassName("dashes");
                if(charArray.includes(button.innerText)){
                    charArray.forEach((char,index)=>{
                        if(char===button.innerText){
                            dashes[index].innerText=char;
                            winCount+=1;
                            if(winCount===charArray.length){
                                resultText.innerHTML="<h2 class='win-msg'>You Win!</h2>";
                                blocker();
                            }
                        }
                    });
                }else{
                    count+=1;
                    drawMan(count);
                    if(count===8){
                        resultText.innerHTML="<h2 class='lose-msg'>You Lose!</h2>";
                        blocker();
                    }
                }
                button.disabled=true;
        });
        letterContainer.append(button);
    }
    displayOptions();
    let{ initialDrawing }=canvasCreator();
    initialDrawing();
}
const canvasCreator=()=>{
    let context=canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle="#0b032d";
    context.lineWidth=2;

    const drawLine=(fromX,fromY,toX,toY)=>{
        context.moveTo(fromX,fromY);
        context.lineTo(toX,toY);
        context.stroke();
    };

    const head=()=>{
        context.beginPath();
        context.arc(70,30,10,0,Math.PI*2,true);
        context.stroke();
    }
    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };
    const eyes=()=>{
        context.beginPath();
        context.arc(65,27,2,0,Math.PI*2,true);
        context.stroke();
        context.beginPath();
        context.arc(75,27,2,0,Math.PI*2,true);
        context.stroke();
    };
    const mouth=()=>{
        drawLine(60,35,65,35);
    }
    const initialDrawing=()=> {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawLine(10, 130, 130, 130);
        drawLine(10, 10, 10, 131);
        drawLine(10, 10, 70, 10);
        drawLine(70, 10, 70, 20);
    };
    return {initialDrawing,head, body, leftArm, rightArm, leftLeg, rightLeg,eyes,mouth };
}
const drawMan=(count) =>{
  let {head,body,leftArm,rightArm,leftLeg,rightLeg,eyes,mouth} = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        case 7:
            eyes();
            break;
        case 8:
            mouth();
            break;
        default:
            break;
    }
};
newGameButton.addEventListener("click", initializer);
window.onload=initializer;