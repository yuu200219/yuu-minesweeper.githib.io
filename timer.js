var sec = 0;
function pad(val) {
    return val > 9 ? val : "0" + val;
}
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');
Minutes.textContent = "00";
Seconds.textContent = "00";

export const timer = setInterval( function() {
    Seconds.innerHTML = pad(++sec%60);
    Minutes.innerHTML = pad(parseInt(sec/60, 10));
}, 1000);
