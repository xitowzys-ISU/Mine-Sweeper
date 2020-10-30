'use strict';

export class RunMineSweeper {

    runGame() {

        let settingsGame = {
            widthBoard: 0,
            heightBoard: 0,
            bombAmount: 0
        };

        const settingsGameInputs = document.querySelectorAll('.settingsGame .settingsGameFlexInline');
        const settingsGameInputsButton = settingsGameInputs[0].querySelectorAll('div input[type=button]');
        const settingsGameInputsRange = settingsGameInputs[1].querySelectorAll('div input[type=range]');
        const settingsGameInputsText = settingsGameInputs[1].querySelectorAll('div input[type=text]');

        settingsGame.widthBoard = parseInt(settingsGameInputsRange[0].value);
        settingsGame.heightBoard = parseInt(settingsGameInputsRange[1].value);
        settingsGame.bombAmount = parseInt(settingsGameInputsRange[2].value);

        if (settingsGame.widthBoard * settingsGame.heightBoard <= settingsGame.bombAmount) {
            console.warn("Бомб больше поля !!!");
            return -1;
        }

        document.querySelector('.settingsGameContainer').style.display = 'none';


        return settingsGame;
    }
}