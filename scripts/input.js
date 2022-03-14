const inputDisplay = document.getElementById("key-input");
document.addEventListener("keydown", (event) => {
    // Check for valid input
    const keyCode = event.key.codePointAt(0);
    const isLowerAlpha = keyCode > 0x60 && keyCode < 0x7b;
    const hasModifier = event.shiftKey || event.ctrlKey || event.metaKey;
    if (isLowerAlpha && !hasModifier && !event.repeat) {
        console.log(`New key: ${event.key}`);
        inputDisplay.innerText = event.key;
    }
});
