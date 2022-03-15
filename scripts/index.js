const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
const kanaRomanization = [
    "a", "i", "u", "e", "o",
    "ka", "ki", "ku", "ke", "ko",
    "sa", "si", "su", "se", "so",
    "ta", "ti", "tu", "te", "to",
    "na", "ni", "nu", "ne", "no",
    "ha", "hi", "hu", "he", "ho",
    "ma", "mi", "mu", "me", "mo",
    "ya", "yu", "yo",
    "ra", "ri", "ru", "re", "ro",
    "wa", "wo",
    "n"
];

function randomizeOrder(kanaList) {
    const randomizedList = Array.from(kanaList);
    // Modern Fisher-Yates shuffle algorithm as described on Wikipedia
    for (let i = 0; i < randomizedList.length - 2; ++i) {
        const j = Math.floor(Math.random() * randomizedList.length);
        [randomizedList[i], randomizedList[j]] = [randomizedList[j], randomizedList[i]];
    }
    return randomizedList;
}

const kanaDisplay = document.getElementById("kana-display");
let kanaList = randomizeOrder(hiragana);
let listIndex = 0;
let incorrectKana = [];
kanaDisplay.innerText = kanaList[0];

let input = "";
const inputDisplay = document.getElementById("key-input");
document.addEventListener("keydown", event => {
    const keyCode = event.key.codePointAt(0);
    const isLowerAlpha = keyCode > 0x60 && keyCode < 0x7b;
    const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;
    if (isLowerAlpha && !hasModifier && !event.repeat) {
        console.log(`New key: ${event.key}`);
        input += event.key;
        inputDisplay.innerText = input;
        processInput();
    } else if (event.key === "Backspace") {
        input = input.substring(0, input.length - 1);
        inputDisplay.innerText = input;
    }
});

function processInput() {
    let correct = checkRomanization();
    if (input.length === 1 && !correct) {
        return;
    } else if (correct) {
        ++listIndex;
        kanaDisplay.innerText = kanaList[listIndex];
    } else if (!incorrectKana.includes(kanaList[listIndex])) {
        incorrectKana.push(kanaList[listIndex]);
    }

    input = "";
    inputDisplay.innerText = input;
}

function checkRomanization() {
    const currentKana = kanaList[listIndex];
    if (currentKana === "を") {
        return input === "o" || input === "wo";
    } else {
        const kanaIndex = hiragana.search(currentKana);
        return input === kanaRomanization[kanaIndex];
    }
}
