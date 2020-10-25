document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');

    // Размер сетки
    let width = 12;
    // Блоки
    let squares = [];
    // Количество бомб
    let bombAmount = 30;
    // Игра проигранна
    let isGameOver = false;
    // Количество флажков
    let flags = 0;

    function createBoard() {
        // Массив с бомбами
        const bombsArray = Array(bombAmount).fill('bomb');

        // Массив пустые поля
        const emptyArray = Array(width * width - bombAmount).fill('valid');

        // Объединенный массив
        const gameArray = emptyArray.concat(bombsArray);

        // Рандомизация
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

        // Добавление полей
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffledArray[i]);
            grid.appendChild(square);
            squares.push(square);

            square.addEventListener('click', () => click(square));

            //cntrl and left click
            square.oncontextmenu = function (e) {
                e.preventDefault();
                addFlag(square);
            };
        }

        // Добавление номера рядом стоящих бомб
        for (let i = 0; i < squares.length; i++) {

            // Найденные бомбы
            let total = 0;

            // Левая сторона
            const isLeftEdge = (i % width === 0);

            // Правая сторона
            const isRightEdge = (i % width === width - 1);

            if (squares[i].classList.contains('valid')) {
                // Левая проверка
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++;

                // Правый верхний угол
                if (i > 11 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++;

                // Вверх
                if (i > 13 && squares[i - width].classList.contains('bomb')) total++;

                // Верхний левый угол
                if (i > 12 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++;

                // Вправо
                if (i < 142 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++;

                // Левый нижний угол
                if (i < 132 && !isLeftEdge && squares[i - 1 + width].classList.contains('bomb')) total++;

                // Правый нижний угол
                if (i < 130 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;

                // Вниз
                if (i < 131 && squares[i + width].classList.contains('bomb')) total++;

                squares[i].setAttribute('data', total);
            }
        }
    }

    createBoard();

    function click(square) {

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
            if (currentId > 11 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 13) {
                const newId = squares[parseInt(currentId - width)].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId > 12 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 142 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 132 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) - 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 130 && !isRightEdge) {
                const newId = squares[parseInt(currentId) + 1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if (currentId < 131) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 20);
    }

    // Конец игры
    function gameOver(square) {
        // result.innerHTML = 'BOOM! Game Over!';
        isGameOver = true;

        //show ALL the bombs
        squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '<img src="images/bomb.svg">';
                square.classList.remove('bomb');
                square.classList.add('checked');
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
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
                // flagsLeft.innerHTML = bombAmount - flags;
            }
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