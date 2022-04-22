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

    incorrectKana.sort();
    
    function createListItem(kana) {
        const listItem = document.createElement("li");
        let romanization = romanizationMap.get(kana);
        if (typeof(romanization) === "object") {
            romanization = romanization.join(", ");
        }
        listItem.innerText = `${kana}: ${romanization}`;
        return listItem;
    }
    
    for (let i = 0; i < incorrectKana.length; i +=6) {
        const list = document.createElement("ul");
        incorrectKana.slice(i, i + 6).forEach(kana => list.appendChild(createListItem(kana)));
        incorrectAnswers.appendChild(list);
    }
}

function removeResults() {
    incorrectAnswers.innerHTML = "";
}

function viewResults() {
    fadeToElement(gameElement, results);   
    resetButton.disabled = false;
}
