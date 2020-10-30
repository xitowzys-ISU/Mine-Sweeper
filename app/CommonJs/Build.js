import {RunMineSweeper} from "./RunMineSweeper";
import {BoardControl} from "./BoardControl";
import {Core} from "./Core";

const _RunMineSweeper = new RunMineSweeper();
const runButton = document.querySelector('.settingsGame > input');

let settingsGame;

runButton.addEventListener('click', function() {

    settingsGame = _RunMineSweeper.runGame();

    if (typeof (settingsGame) === 'object') {
        CreateBoard();
    }

});

function CreateBoard() {

    const MineSweeper = new Core(settingsGame);
    MineSweeper.createBoard();

    // Модуль управления мышью и клавиатурой
    const _BoardControl = new BoardControl(MineSweeper);
}

