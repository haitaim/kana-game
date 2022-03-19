class KanaDisplay {
    constructor(kanaList) {
        this.#kanaList = kanaList;
        this.#characters = this.#kanaDisplay.children;
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
    #characters;
    #kanaListIndex = 3;
    #kanaDisplay = document.getElementById("kana-display");
}
