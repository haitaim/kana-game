const settings = new GameSettings(hiragana, 46);
let game = new Game(settings);
game.start();

document.getElementById("kana-settings").addEventListener("change", event => {
    game.end();
    settings.selectedKana = event.target.value === "hiragana" ? hiragana : katakana;
    game = new Game(settings);
    game.start();
});

document.getElementById("number-settings").addEventListener("change", event => {
    game.end();
    settings.numberOfKana = parseInt(event.target.value, 10);
    game = new Game(settings);
    game.start();
});

const newGameButton = document.querySelector("#results button");
newGameButton.addEventListener("click", () => {
    game = new Game(settings);
    game.start();
});
