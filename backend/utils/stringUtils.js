const repeatNTimesWithSpace = (string, n) => {
    if (!string) return '';
    const arr = new Array(Number(n)).fill(string)
    //return (string + ' ').repeat(n);
    return arr.join(' ')
}

const capitilizeFirstLetter = (string) => {
    if (!string) return '';
    return string[0].toUpperCase() + string.slice(1)
}



module.exports = { repeatNTimesWithSpace, capitilizeFirstLetter };