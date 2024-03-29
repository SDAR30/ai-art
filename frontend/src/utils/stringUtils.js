//capitalize first letter of each word in a string
const capitalizeFirstLetterOfEachWord = (str) => {
    if(!str) return '';
    return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

//remove words from a string after a certain number of characters and add '...' at the end
const removeExtraWords = (str, limit) => {
    if(!str.length) return '';
    str = str.trim();
    let chars = str.split('');
    let newStr = '';
    let i = 0;
    while (newStr.length <= limit) {
        newStr += chars[i];
        i++;
        if(!chars[i]) return newStr;
    }   
    return newStr + '...';
}

// return up to the first n words of a string that are more than 2 letters long
const getFirstNWords = (str, n) => {
    if(!str.length) return '';
    str = str.trim();
    let words = str.split(' ');
    let newStr = '';
    let i = 0;
    while (i < n) {
        if(!words[i]) break;
        if(words[i].length > 2) newStr += words[i] + ' ';
        i++;
    }
    return newStr.trim();
}

module.exports = { capitalizeFirstLetterOfEachWord, removeExtraWords, getFirstNWords };