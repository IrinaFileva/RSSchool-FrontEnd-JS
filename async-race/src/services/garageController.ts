import { containerCars } from '../components/containerCars/containerRoads';
import { Road } from '../components/containerCars/road/road';
import { Api } from '../shared/api/api';
import { BRANDS, LIMIT_CARS_ON_PAGE, MODEL, NUMBER_CARS_CREATED, PAGINATION_START } from '../shared/const/const';
import { Car, PathFile, RequestParam } from '../shared/types/api';
import { buttonsGarage } from '../shared/ui/button';
import { inputColorCreate, inputColorUpdate, inputCreate, inputUpdate } from '../shared/ui/input';
import { textPagingPageGarage, titlePageGarage } from '../shared/ui/text';
import { getRandomColor, removeDisabled, resetValueInput, setDisabled } from '../shared/utils';

export class GarageController {
  page: number;

  limit: number;

  path: string;

  api: Api;

  constructor() {
    this.page = PAGINATION_START;
    this.limit = LIMIT_CARS_ON_PAGE;
    this.path = PathFile.Garage;
    this.api = new Api();
  }

  public start(): void {
    this.getAllCars();
    this.getCarForOnePage();
    buttonsGarage.CreateCar.addEventListener('click', (): void => {
      this.controlButtonCreate();
    });
    buttonsGarage.GenerateCars.addEventListener('click', (): void => {
      this.controlButtonGenerateCar();
    });
    containerCars.addEventListener('click', (elem: MouseEvent): void => {
      setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
      const target: HTMLElement = elem.target as HTMLElement;
      this.controlButtonSelect(target);
      this.controlButtonRemove(target);
    });
    buttonsGarage.UpdateCar.addEventListener('click', (): void => {
      this.controlButtonUpdate();
    });
  }

  public async getAllCars(): Promise<void> {
    const date: Car[] = await this.api.getDate<Car[]>(this.path);
    titlePageGarage.textContent = `Garage (${date.length})`;
    textPagingPageGarage.textContent = `Page #${this.page}`;
    if (date.length > this.limit) {
      buttonsGarage.NextPage.removeAttribute('disabled');
    }
  }

  public async getCarForOnePage(): Promise<void> {
    const url: string = `${this.path}?${RequestParam.Page}${this.page}&${RequestParam.Limit}${this.limit}`;
    const date: Car[] = await this.api.getDate<Car[]>(url);
    containerCars.innerHTML = '';
    for (let i = 0; i < date.length; i += 1) {
      const track: HTMLElement = new Road(`${date[i].id}`, date[i].name, date[i].color).addChildren();
      containerCars.append(track);
    }
    await this.getAllCars();
  }

  private async controlButtonCreate(): Promise<void> {
    setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    if (inputCreate.value === '') {
      inputCreate.style.border = '2px solid red';
    } else {
      await this.api.postDate(inputCreate.value, inputColorCreate.value);
      this.getCarForOnePage();
    }
    resetValueInput(inputCreate, inputColorCreate);
  }

  private async controlButtonGenerateCar() {
    setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    for (let i = 0; i < NUMBER_CARS_CREATED; i += 1) {
      const randomColor: string = getRandomColor();
      const brandCar: string = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const modelCar: string = MODEL[Math.floor(Math.random() * MODEL.length)];
      const randomName: string = `${brandCar} ${modelCar}`;
      this.api.postDate<Car>(randomName, randomColor);
    }
    this.getCarForOnePage();
  }

  private async controlButtonSelect(target: HTMLElement): Promise<void> {
    if (target && target.classList.contains('select')) {
      removeDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
      const parent: HTMLElement | null = target.parentElement;
      if (parent) {
        const id: string | null = parent.getAttribute('id');
        if (id) {
          const car: Car = await this.api.getDate<Car>(`${this.path}/${id}`);
          inputUpdate.value = car.name;
          inputColorUpdate.value = car.color;
          buttonsGarage.UpdateCar.id = id;
        }
      }
    }
  }

  private async controlButtonUpdate(): Promise<void> {
    const id: string | null = buttonsGarage.UpdateCar.getAttribute('id');
    const nameCar: string = inputUpdate.value;
    const colorCar: string = inputColorUpdate.value;
    if (id) {
      await this.api.putDate<Car>(id, nameCar, colorCar);
      this.getCarForOnePage();
      setDisabled(inputUpdate, inputColorUpdate, buttonsGarage.UpdateCar);
    }
  }

  private async controlButtonRemove(target: HTMLElement): Promise<void> {
    if (target && target.classList.contains('remove')) {
      const parent: HTMLElement | null = target.parentElement;
      if (parent) {
        const id: string | null = parent.getAttribute('id');
        if (id) {
          await this.api.deleteDate(id);
          this.getCarForOnePage();
        }
      }
    }
  }
}

export const controllerGarage: GarageController = new GarageController();
