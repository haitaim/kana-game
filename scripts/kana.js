const hiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

const kanaRomanization = [
    "a", "i", "u", "e", "o",
    "ka", "ki", "ku", "ke", "ko",
    "sa", ["si", "shi"], "su", "se", "so",
    "ta", ["ti", "chi"], ["tu", "tsu"], "te", "to",
    "na", "ni", "nu", "ne", "no",
    "ha", "hi", ["hu", "fu"], "he", "ho",
    "ma", "mi", "mu", "me", "mo",
    "ya", "yu", "yo",
    "ra", "ri", "ru", "re", "ro",
    "wa", ["o", "wo"],
    "n"
];

const kanaDisplay = document.getElementById("kana-display");
