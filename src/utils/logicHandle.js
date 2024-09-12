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
    const minutes = date.getUTCMinutes();
    const diff = minutes % 10;
    const roundedMinutes = minutes + (diff >= 0 ? 10 - diff : -diff);
    date.setUTCDate(date.getUTCDate() - day);
    date.setUTCHours(date.getUTCHours() - hour);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    if (day < 2) {
        date.setUTCMinutes(roundedMinutes);
    }
    if (day === 7 || mon === 1) {
        date.setUTCMinutes(0);
        date.setUTCHours(date.getUTCHours() + 1);
        console.log(date);
    }
    date.setUTCMonth(date.getUTCMonth() - mon);
    date.setUTCFullYear(date.getUTCFullYear() - year);
    if (year > 0) {
        date.setUTCHours(0);
        date.setUTCMinutes(0);
    }
    return date.getTime();
  }

// export fucntion covertDate(timestamp){
//     var date = new Date(timestamp * 1000);
// var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
// console.log(formattedDate);
// }
