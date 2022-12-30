const circles = document.querySelector(".grid-circles").querySelectorAll("div");
const menu = document.querySelector(".menu");
const playButton = menu.querySelector("button");
const h1 = menu.querySelector("h1");
const shape = document.querySelectorAll(".shape-fill");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const playTurnTitle = document.querySelector(".playerTurn");
const body = document.body;
let winnerPlayer = '';
let turn = "BLUE";
let gameEnded = false;
let playerWon = false;
let slots = 
[
  [-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1],
  [ 0, 0, 0, 0, 0, 0, 0]
];

const takeSlot = (id) => {
  if (turn === 'BLUE' && slots[parseInt(id[0])][parseInt(id[1])] === 0) {
    slots[parseInt(id[0])][parseInt(id[1])] = 1;
    makeBlue(id);
    prepareNextPick(id);
    turn = 'RED'
  } else if (turn === 'RED' && slots[parseInt(id[0])][parseInt(id[1])] === 0) {
    slots[parseInt(id[0])][parseInt(id[1])] = 2;
    makeRed(id);
    prepareNextPick(id);
    turn ='BLUE'
  }
}

const makeBlue = (id) => {
  circles.forEach(circle => {
    if (circle.id == id) {
      circle.classList.add("blueCircle");
      void circle.offsetWidth;
      circle.style.boxShadow = "hsl(219, 70%, 20%) 0px 5px 50px";
      return
    }
  })
}

const makeRed = (id) => {
  circles.forEach(circle => {
    if (circle.id == id) {
      circle.classList.add("redCircle");
      void circle.offsetWidth;
      circle.style.boxShadow = "hsl(0, 65%, 20%) 0px 5px 50px";
      return
    }
  })
}

const prepareNextPick = (id) => {
  if (slots[parseInt(id[0]) - 1] !== undefined) {
    slots[parseInt(id[0]) - 1][parseInt(id[1])] = 0; 
  }
}

const makePickableAnimation = () => {
  circles.forEach(circle => {
    if (slots[circle.id[0]][circle.id[1]] === 0 ) {
      circle.style.boxShadow = "hsl(0, 0%, 100%) 0px 5px 50px";
      circle.classList.add("pickable");
    }
  }) 
}

const loopOfCircles = () => {
  for (circle of circles) {
    const y = parseInt(circle.id[0]);
    const x = parseInt(circle.id[1]);
    if (playerWon) {
      break
    }
    if (slots[y][x] == -1 || slots[y][x] == 0) {continue;}
    checkWin(y,x);
  }
}

const checkWin = (y,x) => {
    // checks if they are winning by the south area-------------------------------------
    if 
      (
      slots[y+1] !== undefined &&
      slots[y+2] !== undefined &&
      slots[y+3] !== undefined
      ) {
        // checks if they are winning by the south line
        if 
        (
          (slots[y][x] == slots[y+1][x]) &&
          (slots[y][x] == slots[y+2][x]) &&
          (slots[y][x] == slots[y+3][x])
        ) {whoWon(y,x);}
        // checks if they are winning by the east area
        if (checkEast(y,x)) 
        {
          // checks if they are winning by the east line
          if (checkEastLine(y,x)) {whoWon(y,x);}
          // checks if they are winning by the southEast line
          if 
          (
            (slots[y][x] == slots[y+1][x+1]) &&
            (slots[y][x] == slots[y+2][x+2]) &&
            (slots[y][x] == slots[y+3][x+3])
          ) {whoWon(y,x);}
        }
        // checks if they are winning by the west area
        if (checkWest(y,x)) 
        {
          // checks if they are winning by the west line
          if (checkWestLine(y,x)) {whoWon(y,x);}
          // checks if they are winning by the southWest line
          if 
          (
            (slots[y][x] == slots[y+1][x-1]) &&
            (slots[y][x] == slots[y+2][x-2]) &&
            (slots[y][x] == slots[y+3][x-3])
          ) {whoWon(y,x);}
        }
    } 
    // checks if they are winning by the north area-------------------------------------
    if 
    (
    slots[y-1] !== undefined &&
    slots[y-2] !== undefined &&
    slots[y-3] !== undefined
    ) {
      // checks if they are winning by the north line
      if 
      (
        (slots[y][x] == slots[y-1][x]) &&
        (slots[y][x] == slots[y-2][x]) &&
        (slots[y][x] == slots[y-3][x])
      ) {whoWon(y,x);}
      // checks if they are winning by the east area
      if (checkEast(y,x)) 
      {
        // checks if they are winning by the east line
        if (checkEastLine(y,x)) {whoWon(y,x);}
        // checks if they are winning by the northEast line
        if 
        (
          (slots[y][x] == slots[y-1][x+1]) &&
          (slots[y][x] == slots[y-2][x+2]) &&
          (slots[y][x] == slots[y-3][x+3])
        ) {whoWon(y,x);}
      }
      // checks if they are winning by the west area
      if (checkWest(y,x)) 
      {
        // checks if they are winning by the west line
        if (checkWestLine(y,x)) {whoWon(y,x);}
        // checks if they are winning by the northWest line
        if 
        (
          (slots[y][x] == slots[y-1][x-1]) &&
          (slots[y][x] == slots[y-2][x-2]) &&
          (slots[y][x] == slots[y-3][x-3])
        ) {whoWon(y,x);}
      }
  } 
}
  

const checkEast = (y,x) => {
  if (
    slots[y][x+1] !== undefined &&
    slots[y][x+2] !== undefined &&
    slots[y][x+3] !== undefined
  ) {return true;}
  else {return false;}

}

const checkWest = (y,x) => {
  if (
    slots[y][x-1] !== undefined &&
    slots[y][x-2] !== undefined &&
    slots[y][x-3] !== undefined
  ) {return true;}
  else {return false;}
}

const checkEastLine = (y,x) => {
  if 
  (
    (slots[y][x] == slots[y][x+1]) &&
    (slots[y][x] == slots[y][x+2]) &&
    (slots[y][x] == slots[y][x+3])
  ) {return true;}
  else {return false;}
}

const checkWestLine = (y,x) => {
  if 
  (
    (slots[y][x] == slots[y][x-1]) &&
    (slots[y][x] == slots[y][x-2]) &&
    (slots[y][x] == slots[y][x-3])
  ) {return true;}
  else {return false;}
}

const whoWon = (y,x) => {
  gameEnded = true;
  if (slots[y][x] === 1) {win('BLUE');}
  else if (slots[y][x] === 2) {win('RED');}
}

const win = (winner) => {
  if (winner === 'RED') {
    winnerPlayer = 'RED'
  } else if (winner === 'BLUE') {
    winnerPlayer = 'BLUE'
  }
  playerWon = true;
  gameEnd();
}

const gameEnd = () => {
  turn = 'BLUE'
  playerWon = false;
  restGame();
  restAnimation();
  void h1.offsetWidth;
  menuAppear();
  winnerPlayer = ''
}

const restGame = () => {
  for (let row = 0; row<(slots.length-1); row++) {
    for (let column = 0; column < 7; column++) {
      slots[row][column] = -1;
    }
  }
  for (let slot = 0; slot < slots[5].length; slot++) {
  slots[5][slot] = 0;
  }
}

const restAnimation = () => {
  body.style.backgroundColor = "hsl(0, 0%, 5%)"
  document.documentElement.style.setProperty('--x', "3vw")
  circles.forEach(circle => {
    circle.style.boxShadow = 'hsl(0,0%, 5%) 0px 5px 50px'
    circle.classList.remove("pickable");
    circle.style.width = '3vw';
    circle.style.height = '3vw';

  })
}

const menuAppear = () => {
  h1.textContent = `${winnerPlayer} PLAYER WON`
  h1.style.animation = 'none';
  h1.style.backgroundImage = 'none'
  if (winnerPlayer === 'BLUE') {h1.style.color = "hsl(219, 70%, 32%)"; right.style.backgroundColor = "hsl(219, 70%, 32%)"; right.style.boxShadow = "hsl(219, 70%, 20%) 0px 5px 50px"; left.style.backgroundColor = "hsl(219, 70%, 32%)"; left.style.boxShadow = "hsl(219, 70%, 20%) 0px 5px 50px"; h1.style.textShadow = "hsl(219, 70%, 20%) 0px 5px 3  00px";}
  else if (winnerPlayer === 'RED') {h1.style.color = "hsl(0, 71%, 32%)"; left.style.backgroundColor = "hsl(0, 71%, 32%)"; left.style.boxShadow = "hsl(0, 65%, 20%) 0px 5px 50px"; right.style.backgroundColor = "hsl(0, 71%, 32%)"; right.style.boxShadow = "hsl(0, 65%, 20%) 0px 5px 50px"; h1.style.textShadow = "hsl(0, 65%, 20%) 0px 5px 300px"}
  playButton.textContent = 'try again ?'
  menu.style.height = '30vh';

  setTimeout(()=>{
    menu.style.width = '100vw';
    menu.style.postion = 'relative;';
    menu.style.visibility = "visible";
  },500);

  setTimeout(()=>{
    menu.style.opacity = '1';
  },1000);
}

// makes the game start and adds event for every circle
  const  gameStart =  () => {
  circles.forEach(circle => {
    circle.classList.remove("blueCircle");
    circle.classList.remove("redCircle");
    document.documentElement.style.setProperty('--x', "4.5vw")
    circle.addEventListener('click', () => {
        takeSlot(circle.id);
        loopOfCircles();
        if (gameEnded === false) {
          makePickableAnimation();
          changeColor();

          if (circle.classList.contains("pickable")) {
            playerTurnAnimation();
          }
        }
      })
    })
    gameEnded = false;
    menuDisappear();
    setTimeout(() => {
      changeCirclesSize() 
      makePickableAnimation()
      changeColor();
      playerTurnAnimation();
}, 1500)


}

const menuDisappear = () => {
  menu.style.opacity = '0';

  setTimeout(()=>{
    menu.style.height = '0';
  },500);

  setTimeout(()=>{
    menu.style.width = '0';
    menu.style.postion = 'absolute';
    menu.style.visibility = "hidden";
  },1000);

}

const changeCirclesSize = () => {
  circles.forEach (circle => {
    circle.style.width = '4.5vw';
    circle.style.height = '4.5vw';
  })
}

const changeColor = () => {
  if(turn === 'BLUE') {
    body.style.backgroundColor = "hsl(219, 70%, 5%)";
    playTurnTitle.style.color = "hsl(219, 70%, 32%)"
    
  } else if(turn === 'RED') {
    body.style.backgroundColor = "hsl(0, 71%, 5%)";
    playTurnTitle.style.color = "hsl(0, 71%, 32%)"
  }
}

const playerTurnAnimation = () => {
  playTurnTitle.textContent = `${turn}'S TURN`
  playTurnTitle.classList.remove("playerTurnAnimation");
  void playTurnTitle.offsetWidth;
  playTurnTitle.classList.add("playerTurnAnimation");
}
playButton.addEventListener('click', gameStart);