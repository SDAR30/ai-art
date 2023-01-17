//capitalize first letter of each word in a string
const capitalizeFirstLetterOfEachWord = (str) => {
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

module.exports = { capitalizeFirstLetterOfEachWord, removeExtraWords };