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
            }
        }

    }

    mouseDown(boardСell) {
        this.boardСellFocusX = boardСell.getAttribute('data-x');
        this.boardСellFocusY = boardСell.getAttribute('data-y');
        console.log(this.boardСellFocusX);
        console.log(this.boardСellFocusY);

        this.core.click(boardСell);

        console.debug("X: " + this.boardСellFocusX + "; Y: " + this.boardСellFocusY);
    }

    keyBoardControl() {

        document.addEventListener('keydown', (event) => {
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
            if (event.code == 'Enter') {
                this.core.click(this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0]);
            }
            if (event.code == 'Space') {
                this.core.addFlag(this.core.squares[this.boardСellFocusY][this.boardСellFocusX][0]);
            }
        });
    }
}