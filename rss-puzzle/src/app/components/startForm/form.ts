import { BaseComponent } from "../../base-component";
import { labelFirstName, labelLastName } from "./formComponents/label";
import { buttonLogin } from "./formComponents/button";
import { inputName, inputLastName } from "./formComponents/input";
import { LocalStorageObj } from "../../types/interfaces";
import { startPage } from "../startPage/page";

export const startForm = new BaseComponent('form', 'startForm').addElement('Hello!<br> Please enter your first and last name');
startForm.append(labelFirstName, labelLastName, buttonLogin);

startForm.addEventListener('submit', (e: SubmitEvent): void => {
    e.preventDefault();
    const obj: LocalStorageObj = {name: '', lastName: ''};
    obj.name = inputName.value;
    obj.lastName = inputLastName.value;
    localStorage.setItem('IF-Puzzle', JSON.stringify(obj));
    startForm.remove()
    document.body.append(startPage)
})