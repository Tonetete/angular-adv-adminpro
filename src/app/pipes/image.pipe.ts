import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelType } from '../interfaces/modelType.interface';

const base_url = environment.base_api_url;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img: string, type: ModelType): string {
    const regex = new RegExp('^https?://');
    if (img && regex.test(img)) {
      return img;
    }
    if (img) {
      return `${base_url}/upload/${type}/${img}`;
    }
    return `${base_url}/upload/${type}/no-image-available.png`;
  }
}
