document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const stopwatch = document.querySelector('.stopwatch');

    const runGame = document.querySelector('.settingsGame > input');
    const settingsGameInputs = document.querySelectorAll('.settingsGame .settingsGameFlexInline');
    const settingsGameInputsButton = settingsGameInputs[0].querySelectorAll('div input[type=button]');
    const settingsGameInputsRange = settingsGameInputs[1].querySelectorAll('div input[type=range]');
    const settingsGameInputsText = settingsGameInputs[1].querySelectorAll('div input[type=text]');
    
    runGame.addEventListener('click', settingsGame);

    // Ширина поля
    let width;
    // Высота поля
    let height;
    // Блоки
    let squares = [];
    // Количество бомб
    let bombAmount;
    // Игра проигранна
    let isGameStart = false;
    // Игра проигранна
    let isGameOver = false;
    // Количество флажков
    let flags = 0;


    // Настройка поля перед игрой
    function settingsGame(e) {
        width = parseInt(settingsGameInputsRange[0].value);
        height = parseInt(settingsGameInputsRange[1].value);
        bombAmount = parseInt(settingsGameInputsRange[2].value);

        if (width * height <= bombAmount) {
            console.warn("Бомб больше поля !!!");
            return;
        }

        document.querySelector('.settingsGameContainer').style.display = 'none';

        createBoard();
    }

    // Генерация поля
    function createBoard() {

        stopwatch.innerHTML = "00:00";

        grid.style.width = (50 * width) + "px";
        grid.style.height = (50 * height) + "px";

        const gameArray = Array(width * height).fill('valid');

        // Добавление блоков
        for (let i = 0; i < width * height; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(gameArray[i]);
            grid.appendChild(square);
            squares.push(square);

            square.addEventListener('click', () => click(square));

            // Правый клик
            square.oncontextmenu = function (e) {
                e.preventDefault();
                addFlag(square);
            };
        }
    }

    // Обработка клика
    function click(square) {

        // При первом нажатии раставляет бамбы
        if (!isGameStart) {
            square.classList.add('checked');
            const validClass = document.querySelectorAll(".valid:not(.checked)");

            for (let i = 0; i < bombAmount;) {
                let squareId = Math.floor(Math.random() * (width * height - 1));

                if (validClass[squareId].classList.contains('bomb')) {
                    continue;
                } else {
                    validClass[squareId].classList.replace('valid', 'bomb');
                    i++;
                }
            }

            // // Добавление номера рядом стоящих бомб
            for (let i = 0; i < squares.length; i++) {

                // Найденные бомбы
                let total = 0;

                // Левая сторона
                const isLeftEdge = (i % width === 0);

                // Правая сторона
                const isRightEdge = (i % width === width - 1);

                if (squares[i].classList.contains('valid') || squares[i].classList.contains('valid checked')) {
                    // Левая проверка
                    if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;

                    // Правый верхний угол
                    if (i > width - 1 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;

                    // Вверх
                    if (i >= width && squares[i - width].classList.contains('bomb')) total++;

                    // Верхний левый угол
                    if (i > width && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;

                    // Вправо
                    if (i < (width * height - 1) && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;

                    // Левый нижний угол
                    if (i < (width * height - width + 1) && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;

                    // Правый нижний угол
                    if (i < (width * height - width - 1) && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;

                    // Вниз
                    if (i < (width * height - width) && squares[i + width].classList.contains('bomb')) total++;

                    squares[i].setAttribute('data', total);
                }

            }

            let total = square.getAttribute('data');

            if (total != 0) {
                // Цвет цифр
                if (total == 1) square.classList.add('one');
                if (total == 2) square.classList.add('two');
                if (total == 3) square.classList.add('three');
                if (total == 4) square.classList.add('four');

                square.innerHTML = total;
            } else {
                checkSquare(square, square.id);
            }

            findTIME();
            isGameStart = true;

            // openAllValidBlocks();
        }

        if (isGameOver) return;

        if (square.classList.contains('checked') || square.classList.contains('flag')) return;

        let currentId = square.id;

        if (square.classList.contains('bomb')) {
            gameOver(square);
            console.warn('Game over');
        } else {
            let total = square.getAttribute('data');

            if (total != 0) {
                square.classList.add('checked');

                // Цвет цифр
                if (total == 1) square.classList.add('one');
                if (total == 2) square.classList.add('two');
                if (total == 3) square.classList.add('three');
                if (total == 4) square.classList.add('four');

                square.innerHTML = total;
                return;
            }

            checkSquare(square, currentId);
        }
        square.classList.add('checked');
    }

    // Проверка соседних квадратов, если был нважат пустой квадрат
    function checkSquare(square, currentId) {
        // Левая сторона
        const isLeftEdge = (currentId % width === 0);

        // Правая сторона
        const isRightEdge = (currentId % width === width - 1);

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width - 1 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId >= width) {
                const newId = squares[parseInt(currentId - width)].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > width && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < (width * height - 1) && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < (width * height - width + 1) && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < (width * height - width - 1) && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < (width * height - width)) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
    }

    // Конец игры
    function gameOver(square) {
        // result.innerHTML = 'BOOM! Game Over!';
        findTIME();
        isGameOver = true;

        //Показать все бомбы
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '<img src="images/bomb.svg">';
                square.classList.remove('bomb');
                square.classList.add('checked');
            }
        });
    }

    // [Для тестирования] Открыть все ячейки, где нету бомб
    function openAllValidBlocks(square) {
        //Показать все бомбы
        squares.forEach(square => {
            if (square.classList.contains('valid')) {
                square.classList.add('checked');

                let total = square.getAttribute('data');

                if (total != 0) {
                    square.classList.add('checked');

                    // Цвет цифр
                    if (total == 1) square.classList.add('one');
                    if (total == 2) square.classList.add('two');
                    if (total == 3) square.classList.add('three');
                    if (total == 4) square.classList.add('four');

                    square.innerHTML = total;
                    return;
                }
            }
        });
    }

    // Добавление флага
    function addFlag(square) {
        if (isGameOver) return;
        if (!square.classList.contains('checked') && (flags < bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = ' 🚩';
                flags++;
                // flagsLeft.innerHTML = bombAmount - flags;
                checkForWin();
                console.log(isGameOver);
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
                // flagsLeft.innerHTML = bombAmount - flags;
            }
        } else if (square.classList.contains('flag') && (flags == bombAmount)) {
            square.classList.remove('flag');
            square.innerHTML = '';
            flags--;
        }
    }

    // Проверка выигрыша
    function checkForWin() {
        let matches = 0;

        for (let i = 0; i < squares.length; i++) {
            if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
                matches++;
            }
            if (matches === bombAmount) {
                // result.innerHTML = 'YOU WIN!';
                isGameOver = true;
            }
        }
    }

});

/* Секундомер */

let init = 0;
let startDate;
let clocktimer;
let stopwatch = document.querySelector('.stopwatch');

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
}

function findTIME() {
    if (init == 0) {
        startDate = new Date();
        startTIME();
        init = 1;
    } else {
        clearFields();
    }
}

function startTIME() {
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
    if (init == 1) stopwatch.innerHTML = m + ':' + s;
    clocktimer = setTimeout("startTIME()", 10);
}