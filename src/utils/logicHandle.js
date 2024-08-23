export const convertTime = function (timestamp, separator) {
    var pad = function (input) { return input < 10 ? "0" + input : input; };
    var date = timestamp ? new Date(timestamp * 1000) : new Date();
    return [
        pad(date.getHours()),
        pad(date.getMinutes()),
        pad(date.getSeconds())
    ].join(':');
};

export function convertDate(timestamp) {
    var date = new Date(timestamp * 1000);
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



// export fucntion covertDate(timestamp){
//     var date = new Date(timestamp * 1000);
// var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
// console.log(formattedDate);
// }