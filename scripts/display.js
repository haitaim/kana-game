class KanaDisplay {
    constructor(kanaList) {
        this.#kanaList = kanaList;
    }

    start() {
        this.#characters[2].innerText = this.#kanaList[0];
        this.#characters[3].innerText = this.#kanaList[1];
        this.#characters[4].innerText = this.#kanaList[2];
    }

    increment() {
        this.#characters[0].remove();
        const nextKana = document.createElement("div");
        if (this.#kanaListIndex < this.#kanaList.length) {
            nextKana.innerText = this.#kanaList[this.#kanaListIndex];
            ++this.#kanaListIndex;
        }
        this.#kanaDisplay.appendChild(nextKana);
    }

    #kanaList;
    #kanaListIndex = 3;
    #kanaDisplay = document.getElementById("kana-display");
    #characters = this.#kanaDisplay.children;
}

class KeyDisplay {   
    start() {
        this.#prompt.style.visibility = "visible";
    }

    increment(isCorrect) {
        if (!isCorrect) {
            this.#inputs.children[2].classList.add("incorrect");
        }
        this.#inputs.children[0].remove();
        this.#inputs.appendChild(document.createElement("div"));
    }

    changeInput = (newInput) => {
        this.#prompt.style.visibility = "hidden";
        this.#inputs.children[2].innerText = newInput;
        this.changeInput = this.#displayInput;
    };

    #prompt = document.getElementById("prompt");
    #inputs = document.getElementById("inputs");

    #displayInput(newInput) {
        this.#inputs.children[2].innerText = newInput;
    }

}
