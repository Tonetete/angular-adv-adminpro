import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreviewImageService {
  public imageFile!: File | null;
  public previewImage!: string | null | ArrayBuffer;

  constructor() {}

  changePreviewImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files?.length) {
      this.imageFile = target.files[0];
      const reader = new FileReader();
      const url64 = reader.readAsDataURL(this.imageFile);

      reader.onloadend = () => {
        this.previewImage = reader.result;
      };
    } else {
      this.previewImage = null;
    }
  }

  resetImages() {
    this.imageFile = null;
    this.previewImage = null;
  }
}
