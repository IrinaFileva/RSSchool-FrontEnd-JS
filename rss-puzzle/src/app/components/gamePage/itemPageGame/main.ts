import wordLevel1 from '../../../assets/wordCollectionLevel1.json';
import { BaseComponent } from '../../../base-component';
import {
  addAnEmptyItem,
  checkLineWords,
  compareResultStrings,
  dragAndDrop,
  lookFirstEmptyElement,
  setCardStyles,
  setMascPuzzle,
} from '../../../utils';

export const mainPageGame: HTMLElement = new BaseComponent('main', 'pageGame__main').addElement();
const gameBoard: HTMLElement = new BaseComponent('div', 'gamePage__gameBoard').addElement();
const lineWord: HTMLElement = new BaseComponent('div', 'gamePage__lineWord').addElement();
const containerButtons: HTMLElement = new BaseComponent('div', 'gamePage__container-buttons').addElement();
const buttonAutoComplete: HTMLElement = new BaseComponent('button', 'gamePage__bth-complete buttons').addElement('Auto-complete');
const buttonCheck: HTMLElement = new BaseComponent('button', 'gamePage__bth-check buttons').addElement('Check');
const buttonContinue: HTMLElement = new BaseComponent('button', 'gamePage__btn-continue buttons').addElement('Continue');
const marginAddWidth: number = 14; //  чтоб язычек пазла красиво отображался на странице, пришлось margin делать -14px ( данное число компинсирует этот margin)
const numberOffersBlock: number = 10;
const percentages: number = 100;
let proposal: number = 0;
let round: number = 0;

buttonCheck.setAttribute('disabled', '');

function startGame(tier: number, lap: number): void {
  const lineGameBoard: HTMLElement = new BaseComponent('div', 'gamePage__lineGameBoard').addElement();
  const workingOrder: string = wordLevel1.rounds[lap].words[tier].textExample;
  const offerSort: string[] = workingOrder.split(' ').sort(() => Math.random() - 0.5);

  for (let i = 0; i < offerSort.length; i += 1) {
    const word = new BaseComponent('div', 'gamePage__word drag puzzle').addElement(offerSort[i]);
    const emptyCard = new BaseComponent('div', 'gamePage__word no-drag').addElement();
    word.style.maxWidth = `calc(${percentages / offerSort.length}% + ${marginAddWidth}px)`;
    word.draggable = true;
    emptyCard.style.width = `${percentages / offerSort.length}%`;
    setMascPuzzle(word, workingOrder);
    lineGameBoard.append(emptyCard);
    lineWord.append(word);
    word.addEventListener('click', (): void => {
      document.querySelectorAll('.active').forEach((elem: Element) => {
        elem.classList.remove('no-error');
        elem.classList.remove('error');
      });
      buttonCheck.setAttribute('disabled', 'disabled');
      if (!word.classList.contains('active')) {
        addAnEmptyItem(word, lineWord, percentages / offerSort.length);
        setCardStyles(word);
        const emptyItem: ChildNode | undefined = lookFirstEmptyElement(lineGameBoard.childNodes);
        if (emptyItem) {
          lineGameBoard.insertBefore(word, emptyItem);
          emptyItem.remove();
        }
      } else {
        addAnEmptyItem(word, lineGameBoard, percentages / offerSort.length);
        const emptyItem: ChildNode | undefined = lookFirstEmptyElement(lineWord.childNodes);
        if (emptyItem) {
          word.style.opacity = `0`;
          setTimeout((): void => {
            word.style.opacity = `1`;
          });
          lineWord.insertBefore(word, emptyItem);
          word.classList.remove('active');
          emptyItem.remove();
        }
      }
      checkLineWords(lineGameBoard, offerSort, buttonCheck);
      compareResultStrings(lineGameBoard, workingOrder, buttonContinue, buttonCheck);
    });
  }
  dragAndDrop([lineGameBoard, lineWord], offerSort, buttonCheck, workingOrder, buttonContinue);
  gameBoard.append(lineGameBoard);
}
startGame(proposal, round);

buttonContinue.addEventListener('click', (): void => {
  proposal += 1;
  if (numberOffersBlock - 1 < proposal) {
    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild);
    }
    round += 1;
    proposal = 0;
  }
  while (lineWord.firstChild) {
    lineWord.removeChild(lineWord.firstChild);
  }
  startGame(proposal, round);
  buttonContinue.style.display = 'none';
  buttonCheck.style.display = 'block';
  buttonAutoComplete.removeAttribute('disabled');
  buttonCheck.setAttribute('disabled', 'disabled');
});

buttonCheck.addEventListener('click', (): void => {
  const wordResult: NodeListOf<HTMLElement> = document.querySelectorAll('.active');
  const workingOrder: string[] = wordLevel1.rounds[round].words[proposal].textExample.split(' ');
  wordResult.forEach((elem: HTMLElement, index: number) => {
    if (elem.textContent === workingOrder[index]) {
      elem.classList.add('no-error');
      elem.style.borderBottom = '';
    } else {
      elem.classList.add('error');
      elem.style.borderBottom = '';
    }
  });
});

buttonAutoComplete.addEventListener('click', (): void => {
  while (lineWord.firstChild) {
    lineWord.removeChild(lineWord.firstChild);
  }
  const lineGame: ChildNode = gameBoard.childNodes[proposal] as HTMLElement;
  while (lineGame.firstChild) {
    lineGame.removeChild(lineGame.firstChild);
  }
  const workingOrder: string[] = wordLevel1.rounds[round].words[proposal].textExample.split(' ');
  for (let i = 0; i < workingOrder.length; i += 1) {
    const word = new BaseComponent('div', 'gamePage__word puzzle').addElement(workingOrder[i]);
    const widthCard = (workingOrder[i].length * percentages) / workingOrder.join(' ').replaceAll(' ', '').length;
    word.style.width = `${widthCard}%`;
    word.style.borderBottom = '2px solid black';
    word.style.pointerEvents = 'none';
    lineGame.appendChild(word);
  }
  buttonCheck.style.display = 'none';
  buttonContinue.style.display = 'block';
  buttonAutoComplete.setAttribute('disabled', 'disabled');
});

containerButtons.append(buttonAutoComplete, buttonCheck, buttonContinue);
mainPageGame.append(gameBoard, lineWord, containerButtons);
