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

const keyDisplay = document.getElementById("key-display");
function fadeAnswer(input, isCorrect) {
    const inputDiv = document.createElement("div");
    inputDiv.innerText = input;
    inputDiv.classList.add("previous-input");
    if (!isCorrect) {
        inputDiv.classList.add("incorrect");
    }
    inputDiv.addEventListener("animationend", event => {
        event.currentTarget.remove();
    });
    keyDisplay.appendChild(inputDiv);
}

function fadeToNewElement(fadeOutElement, fadeInElement) {
    function startFadeIn() {
        fadeInElement.classList.replace("hidden", "visible");
        fadeOutElement.removeEventListener("transitionend", startFadeIn);
    }
    fadeOutElement.addEventListener("transitionend", startFadeIn);
    fadeOutElement.classList.replace("visible", "hidden");
}

const kanaDisplay = document.getElementById("kana-display");
const gameElement = document.getElementById("main");
const inputPrompt = document.getElementById("prompt");
const inputDisplay = document.getElementById("input");
const results = document.getElementById("results");
const incorrectAnswers = document.getElementById("incorrect-answers");
const resetButton = document.getElementById("reset");

class Game {
    constructor(gameSettings) {
        const selectedKana = gameSettings.selectedKana;
        for (let i = 0; i < selectedKana.length; ++i) {
            this.#romanizationMap.set(selectedKana[i], kanaRomanization[i]);
        }
        this.#kanaList = shuffleKana(selectedKana).slice(0, gameSettings.numberOfKana);
        this.#currentKana = this.#kanaList[0];
    }

    start() {
        kanaDisplay.innerText = this.#currentKana;
        inputPrompt.style.visibility = "visible";
        this.#promptVisible = true;
        inputDisplay.innerText = "";
        document.addEventListener("keydown", this.#keyProcessor);
    }

    end() {
        document.removeEventListener("keydown", this.#keyProcessor);
    }

    viewResults() {
        this.#createResults();
        fadeToNewElement(gameElement, results);
        resetButton.removeAttribute("disabled");
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
                    this.viewResults();
                } else {
                    this.#currentKana = this.#kanaList[this.#kanaListIndex];
                    kanaDisplay.innerText = this.#currentKana;
                    fadeAnswer(this.#input, true);
                    this.#input = "";
                    inputDisplay.innerText = this.#input;
                }
                break;
            case "incorrect":
            default:
                if (!this.#incorrectKana.includes(this.#currentKana)) {
                    this.#incorrectKana.push(this.#currentKana);
                }
                fadeAnswer(this.#input, false);
                this.#input = "";
                inputDisplay.innerText = this.#input;
        }
    }

    #createResults() {
        incorrectAnswers.innerHTML = "";
        let list = document.createElement("ul");
        for (const incorrect of this.#incorrectKana) {
            if (list.childElementCount === 6) {
                incorrectAnswers.appendChild(list);
                list = document.createElement("ul");
            }
            const listItem = document.createElement("li");
            let romanization = this.#romanizationMap.get(incorrect);
            romanization = typeof(romanization) === "string"
                ? romanization
                : romanization.join(", ");
            listItem.innerText = `${incorrect}: ${romanization}`;
            list.appendChild(listItem);
        }
        incorrectAnswers.appendChild(list);
    }

    #kanaList;
    #currentKana;
    #promptVisible;
    #romanizationMap = new Map();
    #kanaListIndex = 0;
    #input = "";
    #incorrectKana = [];
    #keyProcessor = event => {
        const keyCode = event.key.codePointAt(0);
        const isLowerAlpha = keyCode > 0x60 && keyCode < 0x7b;
        const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;
        if (isLowerAlpha && !hasModifier && !event.repeat) {
            if (this.#promptVisible) {
                this.#promptVisible = false;
                inputPrompt.style.visibility = "hidden";
            }

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
