//selecionar todas as células do jogo (data-cell)
const cellElements = document.querySelectorAll("[data-cell]");
//selecionar a board para adicionar a classe
const board = document.querySelector("[data-board]");
//mensagem de vitoria
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]");
//botão para reiniciar
const restartButton = document.querySelector("[data-restart-button]");

//variável para guardar a informação se é a vez do circulo jogar
let isCircleTurn;

/* guardar combinações dos elementos que quando selecionados em ordem  vai ser uma vitória (winning combination)  */
const winningCombinations = [
  //vitórias na horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vitórias na vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //vitória nas diagonais
  [0, 4, 8],
  [2, 4, 6],
];

/* criar uma função chamada start game que vai colocar uma classe, seja de X ou círculos */
const startGame = () => {
  isCircleTurn = false;

  /* adicionar em cada célula um eventListner que vai chamar a função handleClick que só vai acontecer uma vez  (adicionar a figura apenas uma vez que clicar na celular do jogo da velha) */
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  }

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message");
};
//criar uma função de acabar o jogo
const endGame = (isDraw) => {
  //se for empate vai aparecer a mensagem de empate 
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    //senão vai checar o jogador e aparecer a mensagem de vitória 
    winningMessageTextElement.innerText = isCircleTurn
      ? "O Venceu!"
      : "X Venceu!";
  }

  winningMessage.classList.add("show-winning-message");
};
 /*criar uma função que vai verificar a vitória. 
  vai receber qual a jogada atual
  e  */
const checkForWin = (currentPlayer) => {
  /* verificar se alguma combinação está preenchida */
  return winningCombinations.some((combination) => {
    /* vai ver se alguma célula está presente nas células que correspondem a vitória */
    return combination.every((index) => {
      /* a célula contém o current player na index? se tudo retornar True vai ser vitória */
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

/* criar uma função chamada placemark que vai receber a célula e a classtoadd */
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
  //remover a classe de círculo e X da board
  board.classList.remove("circle");
  board.classList.remove("x");
  //se for a vez do círculo vai adicionar círculo
  if (isCircleTurn) {
    board.classList.add("circle");
  } //senão vai colocar um X
  else {
    board.classList.add("x");
  } 
};
//criar uma função para mudar o símbolo
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  //mudar o circlrturning para o inverso do que ele é 
  setBoardHoverClass();
};

/* na função deverá ter alguns objetivos: 
colocar a marca de X ou de círculo.
checar por vitória.
checar por empate
mudar o símbolo após um clique */
const handleClick = (e) => {
  // COLOCAR A MARCA (X OU CIRCULO)
  
  /* e= elemento da célula. criar uma variavel chamada cell (.target é o elemento da célula que vai ser clicado*/ 
  const cell = e.target; 
  /* criar uma variável classtoadd que se for a vez do círculo vai colocar "circulo", se não for, vai colocar "X" */ 
  const classToAdd = isCircleTurn ? "circle" : "x";
   /* chamar a função placemark */
  placeMark(cell, classToAdd);

  // CHECAR POR VITORIA
  const isWin = checkForWin(classToAdd);

  // checar empate
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    // MUDAR O SIMBOLO
    //chamar a função de mudar símbolo
    swapTurns();
  }
};
//chamar o start game
startGame();

restartButton.addEventListener("click", startGame);