const settings = new GameSettings(hiragana);
let game = new Game(settings);
game.start();

const kanaSettings = document.getElementById("kana-settings");
kanaSettings.addEventListener("change", event => {
    game.end();
    settings.selectedKana = event.target.value === "hiragana" ? hiragana : katakana;
    game = new Game(settings);
    game.start();
});

const newGameButton = document.querySelector("#results button");
newGameButton.addEventListener("click", () => {
    game = new Game(selectedKana);
    game.start();
});
