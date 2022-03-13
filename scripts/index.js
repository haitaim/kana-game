const inputDisplay = document.getElementById("key-input");
document.addEventListener("keydown", (event) => {
    inputDisplay.innerText = event.key;
});
