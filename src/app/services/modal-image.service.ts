import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelType } from '../interfaces/modelType.interface';

const base_url = environment.base_api_url;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  public type!: ModelType;
  public id!: string;
  public img!: string;
  private _hideModal: boolean = true;
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: ModelType, id: string, img: string = 'no-image') {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    const regex = new RegExp('^https?://');
    if (img && regex.test(img)) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${this.type}/${img}`;
    }
  }

  closeModal() {
    this.img = '';
    this._hideModal = true;
  }
}
