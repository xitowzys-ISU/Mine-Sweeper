'use strict';

import {
    findTIME
} from "./stopwatch";

export class Core {

    constructor(settingsGame) {
        // Ширина доски
        this.widthBoard = settingsGame.widthBoard;
        // Высота доски
        this.heightBoard = settingsGame.heightBoard;
        // Блоки
        this.squares = [];
        // Количество бомб
        this.bombAmount = settingsGame.bombAmount;
        // Начало игры
        this.isGameStart = false;
        // Игра проигранна
        this.isGameOver = false;
        // Количество флажков
        this.flags = 0;
        // Доска
        this.board = document.querySelector('.grid');
        // Все ячейки на доске
        this.boardСells = document.querySelectorAll('.grid > div');
        // Секундомер
        this.stopwatch = document.querySelector('.stopwatch');
    }

    // Генерация поля
    createBoard() {

        this.stopwatch.innerHTML = "00:00";

        this.board.style.width = (50 * this.widthBoard) + "px";
        this.board.style.height = (50 * this.heightBoard) + "px";

        // Добавление блоков
        for (let i = 0; i < this.heightBoard; i++) {

            this.squares.push(Array());

            for (let j = 0; j < this.widthBoard; j++) {
                const square = document.createElement('div');

                square.setAttribute('data-x', j);
                square.setAttribute('data-y', i);
                square.classList.add("valid");
                square.setAttribute('tabindex', 0);
                this.board.appendChild(square);

                this.squares[i].push(Array());
                this.squares[i][j].push(square);
                this.squares[i][j].push("valid");
            }
        }
    }

    // Обработка клика
    click(square) {

        // Координаты нажатой ячейки
        let boardСellX = parseInt(square.getAttribute('data-x'));
        let boardСellY = parseInt(square.getAttribute('data-y'));

        // При первом нажатии
        if (!this.isGameStart) {

            // Раставление бомб
            for (let i = 0; i < this.bombAmount;) {

                let squareX = Math.floor(Math.random() * (this.widthBoard));
                let squareY = Math.floor(Math.random() * (this.heightBoard));

                if (this.squares[squareY][squareX][1] == 'bomb' || (squareX == boardСellX && squareY == boardСellY)) {
                    continue;
                } else {
                    this.squares[squareY][squareX][1] = 'bomb';
                    i++;
                }

            }

            // Добавление номера рядом стоящих бомб
            for (let i = 0; i < this.heightBoard; i++) {
                for (let j = 0; j < this.widthBoard; j++) {
                    // Найденные бомбы
                    let total = 0;

                    let limitationBoard = this.limitationBoard(j, i);

                    if (this.squares[i][j][1] == 'valid' || this.squares[i][j][1] == 'checked') {

                        if (limitationBoard.upperLeft && this.squares[i - 1][j - 1][1] == 'bomb') total++;
                        if (limitationBoard.upperRight && this.squares[i - 1][j + 1][1] == 'bomb') total++;
                        if (limitationBoard.up && this.squares[i - 1][j][1] == 'bomb') total++;
                        if (limitationBoard.down && this.squares[i + 1][j][1] == 'bomb') total++;
                        if (limitationBoard.left && this.squares[i][j - 1][1] == 'bomb') total++;
                        if (limitationBoard.right && this.squares[i][j + 1][1] == 'bomb') total++;
                        if (limitationBoard.lowerLeft && this.squares[i + 1][j - 1][1] == 'bomb') total++;
                        if (limitationBoard.lowerRight && this.squares[i + 1][j + 1][1] == 'bomb') total++;

                        this.squares[i][j].push(total);
                    }

                }
            }

            let total = this.squares[boardСellY][boardСellX][2];

            // Цвет цифры
            if (total != 0) {
                if (total == 1) square.classList.add('one');
                if (total == 2) square.classList.add('two');
                if (total == 3) square.classList.add('three');
                if (total == 4) square.classList.add('four');

                square.innerHTML = total;
            } else {
                this.checkSquare(square, boardСellX, boardСellY);
            }

            findTIME();
            this.isGameStart = true;
        }

        if (this.isGameOver) return;

        if (square.classList.contains('checked') || square.classList.contains('flag')) return;

        if (this.squares[boardСellY][boardСellX][1] == 'bomb') {
            this.gameOver(square);
            console.warn('Game over');
        } else {
            let total = this.squares[boardСellY][boardСellX][2];

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

            this.checkSquare(square, boardСellX, boardСellY);
        }

        square.classList.add('checked');
        this.squares[boardСellY][boardСellX][1] = "checked";
    }

    // Ограничения доски. В какую сторону можно двигаться.
    limitationBoard(x, y) {

        let limitationBoard = {
            upperLeft: false,
            upperRight: false,
            up: false,
            down: false,
            left: false,
            right: false,
            lowerLeft: false,
            lowerRight: false
        };

        // Левая сторона
        const isLeftEdge = (x % this.widthBoard === 0);

        // Правая сторона
        const isRightEdge = (x % this.widthBoard === this.widthBoard - 1);

        // Верхний левый угол
        if (y >= 1 && !isLeftEdge) limitationBoard.upperLeft = true;

        // Правый верхний угол
        if (y > 0 && !isRightEdge) limitationBoard.upperRight = true;

        // Вверх
        if (y > 0) limitationBoard.up = true;

        // Вниз
        if (y < this.heightBoard - 1) limitationBoard.down = true;

        // Влево
        if (!isLeftEdge) limitationBoard.left = true;

        // Вправо
        if (!isRightEdge) limitationBoard.right = true;

        // Левый нижний угол
        if (y < this.heightBoard - 1 && !isLeftEdge) limitationBoard.lowerLeft = true;

        // Правый нижний угол
        if (y < this.heightBoard - 1 && !isRightEdge) limitationBoard.lowerRight = true;

        return limitationBoard;
    }

    // Проверка соседних квадратов, если был нажат пустой квадрат
    checkSquare(square, x, y) {
        let limitationBoard = this.limitationBoard(x, y);

        setTimeout(() => {
            if (limitationBoard.upperLeft) this.click(this.squares[y - 1][x - 1][0]);
            if (limitationBoard.upperRight) this.click(this.squares[y - 1][x + 1][0]);
            if (limitationBoard.up) this.click(this.squares[y - 1][x][0]);
            if (limitationBoard.down) this.click(this.squares[y + 1][x][0]);
            if (limitationBoard.left) this.click(this.squares[y][x - 1][0]);
            if (limitationBoard.right) this.click(this.squares[y][x + 1][0]);
            if (limitationBoard.lowerLeft) this.click(this.squares[y + 1][x - 1][0]);
            if (limitationBoard.lowerRight) this.click(this.squares[y + 1][x + 1][0]);

        }, 10);
    }

    // Добавление флага
    addFlag(square) {
        console.log("addFlag");
    }

    // Конец игры
    gameOver(square) {
        findTIME();
        this.isGameOver = true;

        //Показать все бомбы
        for (let i = 0; i < this.heightBoard; i++) {
            for (let j = 0; j < this.widthBoard; j++) {
                if (this.squares[i][j][1] == 'bomb') {
                    this.squares[i][j][0].innerHTML = '<img src="images/bomb.svg">';
                    this.squares[i][j][0].classList.add('checked');
                }
            }
        }
    }
}