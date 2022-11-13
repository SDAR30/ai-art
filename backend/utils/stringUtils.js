const repeatNTimesWithSpace = (string, n) => {
    if (!string) return '';
    //return (string + ' ').repeat(n);
    const arr = new Array(Number(n)).fill(string)
    return arr.join(' ')
}

const capitilizeFirstLetter = (string) => {
    if (!string) return '';
    return string[0].toUpperCase() + string.slice(1)
}



module.exports = { repeatNTimesWithSpace, capitilizeFirstLetter };