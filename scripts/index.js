const inputDisplay = document.getElementById("key-input");
document.addEventListener("keydown", (event) => {
    // special refers to anything not representable with a single character
    // e.g. tab key is "Tab", so special
    const keyIsSpecial = event.key.length !== 1;
    const keyCode = event.key.codePointAt(0);
    const isLowerAlpha = keyCode > 0x60 && keyCode < 0x7b;
    const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;
    if (!keyIsSpecial && isLowerAlpha && !hasModifier && !event.repeat) {
        console.log(`New key: ${event.key}`);
        inputDisplay.innerText = event.key;
    }
});
