const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

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
    } else if (event.key === "Backspace") {
        input = input.substring(0, input.length - 1);
    }

    inputDisplay.innerText = input;
});
