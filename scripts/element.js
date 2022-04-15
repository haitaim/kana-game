const gameElement = document.getElementById("main");
const results = document.getElementById("results");
const incorrectAnswers = document.getElementById("incorrect-answers");
const resetButton = document.getElementById("reset");

function fadeToNewElement(fadeOutElement, fadeInElement) {
    function startFadeIn() {
        fadeInElement.classList.replace("hidden", "visible");
        fadeOutElement.removeEventListener("transitionend", startFadeIn);
    }
    fadeOutElement.addEventListener("transitionend", startFadeIn);
    fadeOutElement.classList.replace("visible", "hidden");
}

function createResults(incorrectKana, romanizationMap) {
    incorrectAnswers.innerHTML = "";
    let list = document.createElement("ul");
    for (const incorrect of incorrectKana) {
        if (list.childElementCount === 6) {
            incorrectAnswers.appendChild(list);
            list = document.createElement("ul");
        }
        const listItem = document.createElement("li");
        let romanization = romanizationMap.get(incorrect);
        romanization = typeof(romanization) === "string"
            ? romanization
            : romanization.join(", ");
        listItem.innerText = `${incorrect}: ${romanization}`;
        list.appendChild(listItem);
    }
    incorrectAnswers.appendChild(list);
}

function viewResults() {
    fadeToNewElement(gameElement, results);   
    resetButton.removeAttribute("disabled");
}
