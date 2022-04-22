const gameElement = document.getElementById("main");
const results = document.getElementById("results");
const incorrectAnswers = document.getElementById("incorrect-answers");
const resetButton = document.getElementById("reset");
const settingsElement = document.getElementById("settings");
const settingsOptions = Array.from(settingsElement.getElementsByTagName("input"))
    .concat(document.getElementById("number-settings"));

function fadeToElement(fadeOutElement, fadeInElement) {
    settingsOptions.forEach(r => r.disabled = true);
    function startFadeIn() {
        fadeInElement.classList.replace("hidden", "visible");
        fadeOutElement.removeEventListener("transitionend", startFadeIn);
        setTimeout(
            () => settingsOptions.forEach(r => r.disabled = false),
            100
        );
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

function removeResults() {
    incorrectAnswers.innerHTML = "";
}

function viewResults() {
    fadeToElement(gameElement, results);   
    resetButton.disabled = false;
}
