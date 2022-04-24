const gameElement = document.getElementById("main");
const results = document.getElementById("results");
const incorrectAnswers = document.getElementById("incorrect-answers");
const resetButton = document.getElementById("reset");
const settingsElement = document.getElementById("settings");
const radioButtons = Array.from(settingsElement.getElementsByTagName("input"));

function fadeToElement(fadeOutElement, fadeInElement) {
    const disabledButtons = radioButtons.filter(r => r.disabled);
    radioButtons.forEach(r => r.disabled = true);
    function startFadeIn() {
        fadeInElement.classList.replace("hidden", "visible");
        fadeOutElement.removeEventListener("transitionend", startFadeIn);
        setTimeout(
            () => radioButtons.forEach(r => r.disabled = disabledButtons.includes(r)),
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
