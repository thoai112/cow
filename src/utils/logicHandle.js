export const convertTime = function (timestamp, separator) {
    var pad = function (input) { return input < 10 ? "0" + input : input; };
    var date = timestamp ? new Date(timestamp) : new Date();
    return [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
    ].join(':');
};

export function convertDate(timestamp) {
    var date = new Date(timestamp);
    var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    return formattedDate
}


export const priceConvert = (price) => {
    const stringPrice = String(price);
    if (stringPrice >= 0.005) {
        return Number(Number(stringPrice).toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 2 })
    }
    else {
        let numfix = 0;
        for (let num of stringPrice) {
            if (num === '0' || num === '.') {
                numfix++;
            }
            else {
                break;
            }
        }
        return Number(stringPrice).toFixed(numfix + 2);
    }
};

export function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

export function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

export function roundTimestamp(targetTimestamp,hour, day, mon, year) {
    const date = new Date(targetTimestamp);
    const minutes = date.getMinutes();
    const diff = minutes % 10;
    const roundedMinutes = minutes + (diff >= 0 ? 10 - diff : -diff);
    date.setDate(date.getDate() - day);
    date.setHours(date.getHours() - hour);
    date.setSeconds(0);
    date.setMilliseconds(0);
    if (day < 2){
        date.setMinutes(roundedMinutes);
    }
    if (day===7 || mon===1){
        date.setMinutes(0);
        date.setHours(date.getHours() + 1);
        console.log(date);
    }
    date.setMonth(date.getMonth() - mon);
    date.setFullYear(date.getFullYear() - year);
    if (year > 0){
        date.setHours(0);
        date.setMinutes(0);
    }
    return date.getTime();
  }

// export fucntion covertDate(timestamp){
//     var date = new Date(timestamp * 1000);
// var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
// console.log(formattedDate);
// }
