'use strict';

export class MenuGame {

    constructor() {

        this.MenuGame();
    }

    MenuGame() {

        const settingsGameInputs = document.querySelectorAll('.settingsGame .settingsGameFlexInline');
        const settingsGameInputsButton = settingsGameInputs[0].querySelectorAll('div input[type=button]');
        const settingsGameInputsRange = settingsGameInputs[1].querySelectorAll('div input[type=range]');
        const settingsGameInputsText = settingsGameInputs[1].querySelectorAll('div input[type=number]');
        
        for (let i = 0; i < settingsGameInputsRange.length; i++) {
            settingsGameInputsText[i].value = settingsGameInputsRange[i].value; 

            settingsGameInputsRange[i].addEventListener('change', () => {
                settingsGameInputsText[i].value = settingsGameInputsRange[i].value; 
            });

            settingsGameInputsText[i].addEventListener('change', () => {
                settingsGameInputsRange[i].value = settingsGameInputsText[i].value; 
            });

            settingsGameInputsButton[i].addEventListener('click', () => {
                let buttonName = settingsGameInputsButton[i];

                if(buttonName.name == 'easy')
                {
                    settingsGameInputsText[0].value = 8;
                    settingsGameInputsText[1].value = 8;
                    settingsGameInputsText[2].value = 10;
                    
                    settingsGameInputsRange[0].value = 8;
                    settingsGameInputsRange[1].value = 8;
                    settingsGameInputsRange[2].value = 40;
                }
                if(buttonName.name == 'medium')
                {
                    settingsGameInputsText[0].value = 14;
                    settingsGameInputsText[1].value = 14;
                    settingsGameInputsText[2].value = 50;
                    
                    settingsGameInputsRange[0].value = 14;
                    settingsGameInputsRange[1].value = 14;
                    settingsGameInputsRange[2].value = 40;
                }
                if(buttonName.name == 'hard')
                {
                    settingsGameInputsText[0].value = 28;
                    settingsGameInputsText[1].value = 16;
                    settingsGameInputsText[2].value = 140;
                    
                    settingsGameInputsRange[0].value = 28;
                    settingsGameInputsRange[1].value = 18;
                    settingsGameInputsRange[2].value = 140;
                }
            });
        }

    }
}