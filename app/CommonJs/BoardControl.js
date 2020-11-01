'use strict';

export class BoardControl {
    constructor(core) {
        this.core = core;

        this.mouseControl();
        this.keyBoardControl();

        this.boardСellFocusX = 0;
        this.boardСellFocusY = 0;
    }

    mouseControl() {
        for (let i = 0; i < this.core.heightBoard; i++) {
            for (let j = 0; j < this.core.widthBoard; j++) {
                this.core.squares[i][j][0].addEventListener('click', () => this.mouseDown(this.core.squares[i][j][0]));

                // Правый клик
                this.core.squares[i][j][0].oncontextmenu = (e) => {
                    e.preventDefault();
                    this.core.addFlag(this.core.squares[i][j][0]);
                };

                // При наведении мыши кидать фокус
                this.core.squares[i][j][0].onmouseover = () => {
                    this.mouseFocus(this.core.squares[i][j][0]);
                };
            }
        }

    }

    mouseFocus(boardСell) {
        this.boardСellFocusX = boardСell.getAttribute('data-x');
        this.boardСellFocusY = boardСell.getAttribute('data-y');

        boardСell.focus();
    }

    mouseDown(boardСell) {
        this.boardСellFocusX = boardСell.getAttribute('data-x');
        this.boardСellFocusY = boardСell.getAttribute('data-y');

        this.core.click(boardСell);
    }

    keyBoardControl() {

        document.addEventListener('keydown', (event) => {

            console.debug(event.metaKey);
            let limitationBoard = this.core.limitationBoard(this.boardСellFocusX, this.boardСellFocusY);

            if ((event.code == "KeyW" || event.code == 'ArrowUp') && limitationBoard.up) {
                this.boardСellFocusY--;
                this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0].focus();
            }
            if ((event.code == 'KeyS' || event.code == 'ArrowDown') && limitationBoard.down) {
                this.boardСellFocusY++;
                this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0].focus();
            }
            if ((event.code == 'KeyA' | event.code == 'ArrowLeft') && limitationBoard.left) {
                this.boardСellFocusX--;
                this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0].focus();
            }
            if ((event.code == 'KeyD' || event.code == 'ArrowRight') && limitationBoard.right) {
                this.boardСellFocusX++;
                this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0].focus();
            }
            if ((event.code == 'Enter' || event.code == 'Space') && !(event.ctrlKey || event.metaKey)) {
                this.core.click(this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0]);
            }
            if ((event.code == 'Enter' || event.code == 'Space') && (event.ctrlKey || event.metaKey)) {
                this.core.addFlag(this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0]);
            }

            // ctrlKey
        });
    }
}