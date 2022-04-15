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

const settings = { selectedKana: hiragana, numberOfKana: 46 };
const hasSessionStorage = storageAvailable();
if (hasSessionStorage) {
    const kanaSaved = sessionStorage.getItem("kanaSetting");
    if (kanaSaved === "katakana") {
        settings.selectedKana = katakana;
    }
    const numberSaved = sessionStorage.getItem("numberSetting");
    if (numberSaved !== null) {
        settings.numberOfKana = parseInt(numberSaved, 10);
    }
}

const startKana = settings.selectedKana === hiragana ? "hiragana" : "katakana";
document.querySelector(`input[value="${startKana}"]`).setAttribute("checked", "");
document.querySelector(`input[value="${settings.numberOfKana}"]`).setAttribute("checked", "");

// Start game
let game = new Game(settings);
game.start();

// Change settings
document.getElementById("kana-settings").addEventListener("change", event => {
    if (hasSessionStorage) {
        sessionStorage.setItem("kanaSetting", event.target.value);
    }
    settings.selectedKana = event.target.value === "hiragana" ? hiragana : katakana;
});

document.getElementById("number-settings").addEventListener("change", event => {
    if (hasSessionStorage) {
        sessionStorage.setItem("numberSetting", event.target.value);
    }
    settings.numberOfKana = parseInt(event.target.value, 10);
});

// Reset game
const settingsElement = document.getElementById("settings");
const radioButtons = Array.from(settingsElement.getElementsByTagName("input"));

function resetGame(fadeOutElement) {
    resetButton.setAttribute("disabled", "");
    radioButtons.forEach(r => r.setAttribute("disabled", ""));
    fadeToNewElement(fadeOutElement, gameElement);
    game = new Game(settings);

    function startInterfaces() {
        game.start();
        fadeOutElement.removeEventListener("transitionend", startInterfaces);
        setTimeout(
            () => radioButtons.forEach(r => r.removeAttribute("disabled")),
            100
        );
    }
    fadeOutElement.addEventListener("transitionend", startInterfaces);
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
