/* Секундомер */

var init = 0;
var startDate;
var clocktimer;
var stopwatch = document.querySelector('.stopwatch');

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
}

export function findTIME() {
    if (init == 0) {
        startDate = new Date();
        startTIME();
        init = 1;
    } else {
        clearFields();
    }
}

function startTIME() {
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();
    var ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    var s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    var m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    var h = t % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (init == 1) stopwatch.innerHTML = m + ':' + s;
    clocktimer = setTimeout(startTIME, 10);
}
