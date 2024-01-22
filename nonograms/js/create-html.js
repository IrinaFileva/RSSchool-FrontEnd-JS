import { addElement, createAndFillButton } from "./functions.js";

export const body = document.querySelector('.body');

const wrapperBody = document.createElement ('div');
wrapperBody.className = 'body__wrapper';

// Header
const header = addElement('header', 'header', wrapperBody);

const nameGame = addElement('h1', 'header__title', header);
nameGame.textContent = 'Nonograms';

// Main
const main = addElement('main', 'main', wrapperBody);

// Section Game Board
const sectionGame = addElement('section', 'game-board', main);

const wrapperGame = addElement('div', 'game-board__wrapper', sectionGame);

// Container Buttons-Level And Button-RandomGame
const containerButtonsLevel = addElement('div', 'game-board__container_buttons-level', wrapperGame);
const buttonEasyLevel = addElement('button', 'buttons-level__button button_easy-level', containerButtonsLevel);
const buttonMediumLevel = addElement('button', 'buttons-level__button button_medium-level', containerButtonsLevel);
const buttonHardLevel = addElement('button', 'buttons-level__button button_hard-level', containerButtonsLevel);
const buttonRandomGame = addElement('button', 'buttons-level__button button_random-game', containerButtonsLevel);

createAndFillButton(buttonEasyLevel, 'button', 'Easy (5*5) ▼');
createAndFillButton(buttonMediumLevel, 'button', 'Medium (10*10) ▼');
createAndFillButton(buttonHardLevel, 'button', 'Hard (15*15) ▼');
createAndFillButton(buttonRandomGame, 'button', 'Random Game');

export {wrapperBody};