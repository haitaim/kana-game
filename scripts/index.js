let gameState = new Game(hiragana);

const newGameButton = document.querySelector("#results button");
newGameButton.addEventListener("click", event => {
    gameState = new Game(hiragana);
});
