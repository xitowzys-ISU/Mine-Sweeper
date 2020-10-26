function trim(string) {
    return string.replace(/\s+/g, " ").replace(/(^\s*)|(\s*)$/g, '');
}

let init = 0;
let startDate;
let clocktimer;

export function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    document.clockform.clock.value = '00:00:00.00';
    document.clockform.label.value = '';
}

export function clearALL() {
    clearFields();
    document.getElementById('marker').innerHTML = '';
}

export function startTIME() {
    let thisDate = new Date();
    let t = thisDate.getTime() - startDate.getTime();
    let ms = t % 1000;
    t -= ms;
    ms = Math.floor(ms / 10);
    t = Math.floor(t / 1000);
    let s = t % 60;
    t -= s;
    t = Math.floor(t / 60);
    let m = t % 60;
    t -= m;
    t = Math.floor(t / 60);
    let h = t % 60;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    if (ms < 10) ms = '0' + ms;
    if (init == 1) document.clockform.clock.value = h + ':' + m + ':' + s + '.' + ms;
    clocktimer = setTimeout("startTIME()", 10);
}

export function findTIME() {
    if (init == 0) {
        startDate = new Date();
        startTIME();
        init = 1;
    } else {
        let str = trim(document.clockform.label.value);
        document.getElementById('marker').innerHTML = (str == '' ? '' : str + ': ') +
            document.clockform.clock.value + '<br>' + document.getElementById('marker').innerHTML;
        clearFields();
    }
}