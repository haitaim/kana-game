// Get web storage
// From MDN: Using the Web Storage API
function storageAvailable() {
    let storage = window.sessionStorage;
    try {
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function createSettings(hasStorage) {
    if (hasStorage) {
        const numberSetting = sessionStorage.getItem("numberSetting");
        const numberOfKana = numberSetting !== null ? parseInt(numberSetting, 10) : 10;
        return {
            selectedKana: sessionStorage.getItem("kanaSetting") ?? "hiragana",
            diacritics: sessionStorage.getItem("diacriticsSetting") ?? "none",
            numberOfKana: numberOfKana
        };
    } else {
        return { selectedKana: "hiragana", diacritics: "none", numberOfKana: 0 };
    }
}
const hasSessionStorage = storageAvailable();
const settings = createSettings(hasSessionStorage);

document.querySelector(`input[value="${settings.selectedKana}"]`).setAttribute("checked", "");
document.querySelector(`input[value="${settings.numberOfKana}"]`).setAttribute("checked", "");
document.querySelector(`input[value="${settings.diacritics}"]`).setAttribute("checked", "");

// Start game
let game = new Game(settings);
game.start();

// Change settings
document.getElementById("kana-settings").addEventListener("change", event => {
    if (hasSessionStorage) {
        sessionStorage.setItem("kanaSetting", event.target.value);
    }
    settings.selectedKana = event.target.value;
});

document.getElementById("diacritics-settings").addEventListener("change", event => {
    if (hasSessionStorage) {
        sessionStorage.setItem("diacriticsSetting", event.target.value);
    }
    settings.diacritics = event.target.value;
});

document.getElementById("number-settings").addEventListener("change", event => {
    if (hasSessionStorage) {
        sessionStorage.setItem("numberSetting", event.target.value);
    }
    settings.numberOfKana = parseInt(event.target.value, 10);
});

// Reset game
function resetGame(fadeOutElement) {
    resetButton.setAttribute("disabled", "");
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
