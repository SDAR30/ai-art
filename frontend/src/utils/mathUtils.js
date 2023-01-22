//take a number between 0 and 5 and convert to 0-100 rounded to nearest 10's place
function convertRatingToPercent(rating) {
    return Math.ceil(Math.round(parseFloat(rating) * 20) / 10) * 10;
}   // Path: ai-art/frontend/src/components/starRating/StarRating.js


//take a number and round to one decimal place
function roundToOneDecimal(num) {
    return Math.round(num * 10) / 10;
}   // so 4 will turn into 4.0, 4.5 will turn into 4.5, 4.6 will turn into 4.6, etc

// take a number between 0 to 5.0 and round it to the nearest 0.5
function roundToHalf(num) {
    return Math.round(num * 2) / 2;
}

module.exports = { convertRatingToPercent, roundToOneDecimal, roundToHalf };