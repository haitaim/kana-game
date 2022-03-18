function shuffleKana(kana) {
    // From example on MDN Math.random() article
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const shuffledKana = Array.from(kana);
    // Modern Fisher-Yates shuffle algorithm as described on Wikipedia
    for (let i = 0; i < shuffledKana.length - 2; ++i) {
        const j = getRandomInt(i, shuffledKana.length);
        [shuffledKana[i], shuffledKana[j]] = [shuffledKana[j], shuffledKana[i]];
    }
    return shuffledKana;
}

function checkInput(input, currentKana, selectedKana) {
    const kanaIndex = selectedKana.search(currentKana);
    const answer = kanaRomanization[kanaIndex]
    switch (typeof(answer)) {
        case "object":
            return answer.includes(input);
        case "string":
        default:
            return answer === input;
    }
}

const inputDisplay = document.getElementById("key-input");
const results = document.getElementById("results");

class Game {
    constructor(gameSettings) {
        this.#selectedKana = gameSettings.selectedKana;
        this.#kanaList = shuffleKana(this.#selectedKana);
        this.#currentKana = this.#kanaList[0];
    }

    start() {
        kanaDisplay.innerText = this.#currentKana;
        document.addEventListener("keydown", this.#keyProcessor);
        document.getElementById("game").classList.replace("hidden", "visible");
        results.classList.replace("visible", "hidden");
    }

    end() {
        document.removeEventListener("keydown", this.#keyProcessor);
    }

    viewResults() {
        const incorrectList = results.children[1];
        incorrectList.innerHTML = "";
        for (const kana of this.#incorrectKana) {
            const listElement = document.createElement("li");
            listElement.innerText = kana;
            incorrectList.appendChild(listElement);
        }

        results.classList.replace("hidden", "visible");
        document.getElementById("game").classList.replace("visible", "hidden");

    }

    #processInput() {
        const correct = checkInput(this.#input, this.#currentKana, this.#selectedKana);
        const possibleHepburn = ["sh", "ch", "ts"].includes(this.#input);
        if ((this.#input.length === 1 && !correct) || possibleHepburn) {
            return;
        } else if (correct) {
            ++this.#kanaListIndex;
        } else if (!this.#incorrectKana.includes(this.#currentKana)) {
            this.#incorrectKana.push(this.#currentKana);
        }

        this.#input = "";
        inputDisplay.innerText = this.#input;

        if (this.#kanaListIndex === this.#kanaList.length) {
            this.end();
            this.viewResults();
        } else {
            this.#currentKana = this.#kanaList[this.#kanaListIndex];
            kanaDisplay.innerText = this.#currentKana;
        }
    }

    #kanaList;
    #currentKana;
    #selectedKana;
    #kanaListIndex = 0;
    #input = "";
    #incorrectKana = [];
    #keyProcessor = event => {
        const keyCode = event.key.codePointAt(0);
        const isLowerAlpha = keyCode > 0x60 && keyCode < 0x7b;
        const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;
        if (isLowerAlpha && !hasModifier && !event.repeat) {
            console.log(`New key: ${event.key}`);
            this.#input += event.key;
            inputDisplay.innerText = this.#input;
            this.#processInput();
        } else if (event.key === "Backspace") {
            this.#input = this.#input.substring(0, this.#input.length - 1);
            inputDisplay.innerText = this.#input;
        }
    };
}

class GameSettings {
    constructor(selectedKana) {
        this.selectedKana = selectedKana;
    }

    selectedKana;
}
