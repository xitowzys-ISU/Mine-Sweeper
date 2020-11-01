import {MenuGame} from "./MenuGame";
import {RunMineSweeper} from "./RunMineSweeper";
import {BoardControl} from "./BoardControl";
import {Core} from "./Core";

const _MenuGame = new MenuGame();

const _RunMineSweeper = new RunMineSweeper();
const runButton = document.querySelector('.settingsGame > input');

let settingsGame;

runButton.addEventListener('click', () => {

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

