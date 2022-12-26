//function takes a date in YYYY-MM-DD format and returns how many hours or days or months or years ago it was posted
const timeSince = (date) => {
    let now = new Date();
    let then = new Date(date);
    let diff = now - then;
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(months / 12);
    if (seconds < 60) {
        return seconds === 1 ? `${seconds} sec ago` : `${seconds} secs ago`;
    } else if (minutes < 60) {
        return minutes === 1 ? `${minutes} min ago` : `${minutes} mins ago`;
    } else if (hours < 24) {
        return hours === 1 ? `1 hr ago` : `${hours} hrs ago`;
    } else if (days < 30) {
        return days === 1 ? `yesterday` : `${days} days ago`;
    } else if (months < 12) {
        return months === 1 ? `1 month ago` : `${months} months ago`;
    } else {
        return years === 1 ? `1 year ago` : `${years} years ago`;
    }
}

module.exports = { timeSince };