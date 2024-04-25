import { serverRequests } from '../../server/serverRequests';
import { DataRequest, TextForElement } from '../../shared/types';
import { Button, Link } from '../../shared/ui';
import './styleHeader.css';

export class Header {
  item: HTMLElement;

  constructor() {
    this.item = document.createElement('header');
    this.item.className = 'header-main-page';
    this.addUserName();
    this.addAppName();
    this.addButton();
  }

  private addUserName(): void {
    const h1: HTMLHeadingElement = document.createElement('h1');
    h1.className = 'header-title';
    const data: string | null = sessionStorage.getItem('IF-chat');
    if (data) {
      const text: DataRequest = JSON.parse(data);
      if (text.payload && text.payload.user) {
        h1.textContent = `${TextForElement.HeaderTitle}: ${text.payload.user.login}`;
      }
    }
    this.item.append(h1);
  }

  private addAppName(): void {
    const appName: HTMLParagraphElement = document.createElement('p');
    appName.className = 'header-name-app';
    appName.innerHTML = TextForElement.HeaderAppName;
    this.item.append(appName);
  }

  private addButton(): void {
    const btnInfo: HTMLElement = new Link(
      'header-link-infoPage',
      '#info',
      'header-bth-info',
      'button',
      TextForElement.BtnInfo,
    ).item;
    const btnExit: HTMLElement = new Button('header-btn-exit', 'button', TextForElement.BtnLogout).item;
    btnExit.addEventListener('click', () => serverRequests.UserLogout());
    this.item.append(btnInfo, btnExit);
  }
}
