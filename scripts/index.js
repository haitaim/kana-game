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

const settings = new GameSettings(hiragana, 46);
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

let game = new Game(settings);
game.start();

document.getElementById("kana-settings").addEventListener("change", event => {
    game.end();
    if (hasSessionStorage) {
        sessionStorage.setItem("kanaSetting", event.target.value);
    }
    settings.selectedKana = event.target.value === "hiragana" ? hiragana : katakana;
    game = new Game(settings);
    game.start();
});

document.getElementById("number-settings").addEventListener("change", event => {
    game.end();
    if (hasSessionStorage) {
        sessionStorage.setItem("numberSetting", event.target.value);
    }
    settings.numberOfKana = parseInt(event.target.value, 10);
    game = new Game(settings);
    game.start();
});

newGameButton.addEventListener("click", () => {
    newGameButton.blur();
    newGameButton.setAttribute("disabled", "disabled");
    game = new Game(settings);
    game.start();
});
