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

const hiraganaDiacritic = "がぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ";
const katakanaDiacritic = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

const diacriticRomanization = [
    "ga", "gi", "gu", "ge", "go",
    "za", ["zi", "ji"], "zu", "ze", "zo",
    "da", ["di", "ji", "zi"], ["du", "zu"], "de", "do",
    "ba", "bi", "bu", "be", "bo",
    "pa", "pi", "pu", "pe", "po"
];
