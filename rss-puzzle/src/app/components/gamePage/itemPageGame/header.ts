import { BaseComponent } from '../../../base-component';

export const header = new BaseComponent('header', 'header').addElement();
const titleHeader = new BaseComponent('h1', 'header__title').addElement('RSS-Puzzle');
const containerButtonsHeader = new BaseComponent('div', 'header__container-buttons').addElement();
const buttonExit = new BaseComponent('button', 'header__button-exit').addElement('Logout');
const modalExit = new BaseComponent('div', 'modalExit').addElement("You're sure you want to log out?");
const modalExitButtonNo = new BaseComponent('button', 'modalExit__button no').addElement('No');
export const modalExitButtonYes = new BaseComponent('button', 'modalExit__button yes').addElement('Yes');

modalExit.setAttribute('id', 'modalExit');
modalExit.setAttribute('popover', '');
modalExit.append(modalExitButtonNo, modalExitButtonYes);
buttonExit.setAttribute('popovertarget', 'modalExit');

modalExitButtonNo.addEventListener('click', () => {
  modalExit.hidePopover();
});

containerButtonsHeader.append(buttonExit);
header.append(titleHeader, containerButtonsHeader, modalExit);
