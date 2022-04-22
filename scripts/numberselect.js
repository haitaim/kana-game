function calcMaxKana(gameSettings) {
    let max = 0;
    switch (gameSettings.diacritics) {
        case "separate": max = hiraganaDiacritic.length; break;
        case "included": max = hiragana.length + hiraganaDiacritic.length; break;
        default:
        case "none": max = hiragana.length; break;
    }

    if (gameSettings.selectedKana === "both") {
        max *= 2;
    }

    return max;
}

function hideGreaterThanMax(maxKana) {
    const numberOptions = Array.from(settingsElement.getElementsByTagName("option")).slice(1);
    for (const option of numberOptions) {
        option.disabled = parseInt(option.value, 10) > maxKana;
    }
}

function changeMaxValue(maxKana) {
    const maxAsString = maxKana.toString();
    const maxOption = document.getElementById("max");
    maxOption.value = maxAsString;
    maxOption.innerText = `Max (${maxAsString})`;
}
