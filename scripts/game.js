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

function checkInput(input, answer) {
    const isCorrect = typeof(answer) === "object" ? answer.includes(input) : answer === input;
    if (isCorrect) {
        return "correct";
    }

    const possibleHepburn = ["sh", "ch", "ts"].includes(input);
    const isVowel = ["a", "i", "u", "e", "o",].includes(input);
    if ((!isVowel && input.length === 1) || possibleHepburn) {
        return "incomplete";
    }

    return "incorrect";
}

class Game {
    constructor(gameSettings) {
        let kana = [hiragana, hiraganaDiacritic, katakana, katakanaDiacritic];
        if (gameSettings.selectedKana === "hiragana") {
            kana = kana.filter(k => k === hiragana || k === hiraganaDiacritic);
        } else if (gameSettings.selectedKana === "katakana") {
            kana = kana.filter(k => k === katakana || k === katakanaDiacritic);
        }

        if (gameSettings.diacritics === "none") {
            kana = kana.filter(k => k === hiragana || k === katakana);
        } else if (gameSettings.diacritics === "separate") {
            kana = kana.filter(k => k === hiraganaDiacritic || k === katakanaDiacritic);
        }

        this.#kanaList = shuffleKana(kana.join('')).slice(0, gameSettings.numberOfKana);
        this.#currentKana = this.#kanaList[0];

        for (const k of kana) {
            const romanization = k === hiragana || k === katakana
                ? kanaRomanization
                : diacriticRomanization;
            Array.from(k).forEach(
                (character, i) => this.#romanizationMap.set(character, romanization[i])
            );
        }
    }

    start() {
        this.#kanaDisplay.innerText = this.#currentKana;
        this.#inputPrompt.style.visibility = "visible";
        this.#promptVisible = true;
        this.#inputDisplay.innerText = "";
        document.addEventListener("keydown", this.#keyProcessor);
    }

    end() {
        document.removeEventListener("keydown", this.#keyProcessor);
    }

    #processInput() {
        const answer = this.#romanizationMap.get(this.#currentKana);
        switch (checkInput(this.#input, answer)) {
            case "incomplete":
                return;
            case "correct": 
                ++this.#kanaListIndex;
                if (this.#kanaListIndex === this.#kanaList.length) {
                    this.end();
                    createResults(this.#incorrectKana, this.#romanizationMap);
                    viewResults();
                } else {
                    this.#currentKana = this.#kanaList[this.#kanaListIndex];
                    this.#kanaDisplay.innerText = this.#currentKana;
                    this.#fadeAnswer(true);
                    this.#input = "";
                    this.#inputDisplay.innerText = this.#input;
                }
                break;
            case "incorrect":
            default:
                if (!this.#incorrectKana.includes(this.#currentKana)) {
                    this.#incorrectKana.push(this.#currentKana);
                }
                this.#fadeAnswer(false);
                this.#input = "";
                this.#inputDisplay.innerText = this.#input;
        }
    }

    #fadeAnswer(isCorrect) {
        const inputDiv = document.createElement("div");
        inputDiv.innerText = this.#input;
        inputDiv.classList.add("previous-input");
        if (!isCorrect) {
            inputDiv.classList.add("incorrect");
        }
        inputDiv.addEventListener("animationend", event => {
            event.currentTarget.remove();
        });
        this.#inputDisplay.after(inputDiv);
    }

    #kanaList;
    #currentKana;
    #promptVisible;
    #romanizationMap = new Map();
    #kanaListIndex = 0;
    #input = "";
    #incorrectKana = [];
    #kanaDisplay = document.getElementById("kana-display");
    #inputPrompt = document.getElementById("prompt");
    #inputDisplay = document.getElementById("input");
    #keyProcessor = event => {
        const keyCode = event.key.codePointAt(0);
        const isLowerAlpha = keyCode > 0x60 && keyCode < 0x7b;
        const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;
        if (isLowerAlpha && !hasModifier && !event.repeat) {
            if (this.#promptVisible) {
                this.#promptVisible = false;
                this.#inputPrompt.style.visibility = "hidden";
            }

            console.log(`New key: ${event.key}`);
            this.#input += event.key;
            this.#inputDisplay.innerText = this.#input;
            this.#processInput();
        } else if (event.key === "Backspace") {
            this.#input = this.#input.substring(0, this.#input.length - 1);
            this.#inputDisplay.innerText = this.#input;
        }
    };
}
