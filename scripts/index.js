const settings = { selectedKana: "hiragana", diacritics: "none", numberOfKana: hiragana.length };
let game = new Game(settings);
game.start();

// Change settings
function modifyNumSelect() {
    function clampSelection() {
        const maxOption = document.getElementById("max");
        if (settings.numberOfKana > maxKana) {
            settings.numberOfKana = maxKana;
            maxOption.selected = true;
        } else if (maxOption.selected) {
            settings.numberOfKana = maxKana;
        }
    }

    const maxKana = calcMaxKana(settings);
    clampSelection();
    changeMaxValue(maxKana);
    hideGreaterThanMax(maxKana);
}

document.getElementById("kana-settings").addEventListener("change", event => {
    settings.selectedKana = event.target.value;
    
    modifyNumSelect();
});

document.getElementById("diacritics-settings").addEventListener("change", event => {
    settings.diacritics = event.target.value;

    modifyNumSelect();
});

document.getElementById("number-settings").addEventListener("change", event => {
    settings.numberOfKana = parseInt(event.target.value, 10);
});

// Reset game
function resetGame(fadeOutElement) {
    resetButton.disabled = true;
    fadeToNewElement(fadeOutElement, gameElement);
    game = new Game(settings);

    function startGame() {
        game.start();
        fadeOutElement.removeEventListener("transitionend", startGame);
    }
    fadeOutElement.addEventListener("transitionend", startGame);
}

resetButton.addEventListener("click", () => {
    resetButton.blur();
    resetGame(results);
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter" && results.classList.contains("visible")) {
        resetGame(results);
    }
});

settingsElement.addEventListener("change", () => {
    game.end();
    const fadeOutElement = gameElement.classList.contains("visible") ? gameElement : results;
    resetGame(fadeOutElement);
});
