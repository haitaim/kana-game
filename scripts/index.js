let game = new Game(hiragana);
game.start();

const newGameButton = document.querySelector("#results button");
newGameButton.addEventListener("click", event => {
    game = new Game(hiragana);
    game.start();
});
