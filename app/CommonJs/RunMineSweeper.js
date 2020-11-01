'use strict';

export class RunMineSweeper {
    runGame() {

        let settingsGame = {
            widthBoard: 0,
            heightBoard: 0,
            bombAmount: 0
        };

        const settingsGameInputsNumber = document.querySelectorAll('.settingsGame .settingsGameFlexInline')[1].querySelectorAll('div input[type=number]');

        settingsGame.widthBoard = parseInt(settingsGameInputsNumber[0].value);
        settingsGame.heightBoard = parseInt(settingsGameInputsNumber[1].value);
        settingsGame.bombAmount = parseInt(settingsGameInputsNumber[2].value);

        if (settingsGame.widthBoard * settingsGame.heightBoard <= settingsGame.bombAmount) {
            console.warn("Бомб больше поля !!!");
            return -1;
        }

        document.querySelector('.settingsGameContainer').style.display = 'none';

        return settingsGame;
    }
}