import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { ModelType } from '../interfaces/modelType.interface';

const base_url = environment.base_api_url;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private userService: UserService) {}

  async updateImage(file: File, type: ModelType, id: string) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'x-token': this.userService.token },
        body: formData,
      });
      const data = await response.json();
      if (data.ok) {
        return data;
      }
      console.log(data.msg);
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
