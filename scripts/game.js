function shuffleKana(kana) {
    const shuffledKana = Array.from(kana);
    // Modern Fisher-Yates shuffle algorithm as described on Wikipedia
    for (let i = 0; i < shuffledKana.length - 2; ++i) {
        const j = Math.floor(Math.random() * shuffledKana.length);
        [shuffledKana[i], shuffledKana[j]] = [shuffledKana[j], shuffledKana[i]];
    }
    return shuffledKana;
}

function checkInput(input, currentKana) {
    if (currentKana === "を") {
        return input === "o" || input === "wo";
    } else {
        const kanaIndex = hiragana.search(currentKana);
        return input === kanaRomanization[kanaIndex];
    }
}

const inputDisplay = document.getElementById("key-input");
const results = document.getElementById("results");

class Game {
    constructor(kana) {
        this.#kanaList = shuffleKana(kana);
        this.#currentKana = this.#kanaList[0];

        results.style.visibility = "hidden";
        results.children[1].innerHTML = "";
        kanaDisplay.innerText = this.#currentKana;
        document.addEventListener("keydown", this.#keyProcessor);
    }

    #processInput() {
        const correct = checkInput(this.#input, this.#currentKana);
        if (this.#input.length === 1 && !correct) {
            return;
        } else if (correct) {
            ++this.#kanaListIndex;
        } else if (!this.#incorrectKana.includes(this.#currentKana)) {
            this.#incorrectKana.push(this.#currentKana);
        }

        this.#input = "";
        inputDisplay.innerText = this.#input;

        if (this.#kanaListIndex === this.#kanaList.length) {
            this.endGame();
        } else {
            this.#currentKana = this.#kanaList[this.#kanaListIndex];
            kanaDisplay.innerText = this.#currentKana;
        }
    }

    endGame() {
        document.removeEventListener("keydown", this.#keyProcessor);

        const incorrectList = results.children[1];
        for (const kana of this.#incorrectKana) {
            const listElement = document.createElement("li");
            listElement.innerText = kana;
            incorrectList.appendChild(listElement);
        }

        results.style.visibility = "visible";
    }

    #kanaList;
    #currentKana;
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
