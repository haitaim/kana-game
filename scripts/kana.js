const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
//const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

function randomizeOrder(kanaList) {
    const randomizedList = Array.from(kanaList);
    // Modern Fisher-Yates shuffle algorithm as described on Wikipedia
    for (let i = 0; i < randomizedList.length - 2; ++i) {
        const j = Math.floor(Math.random() * randomizedList.length);
        [randomizedList[i], randomizedList[j]] = [randomizedList[j], randomizedList[i]];
    }
    return randomizedList;
}

const kanaDisplay = document.getElementById("kana-display");
