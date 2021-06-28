import { Component, EventEmitter, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  public imageFile!: File;
  public previewImage!: string | null | ArrayBuffer;

  constructor(
    public fileUploadService: FileUploadService,
    public modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.previewImage = null;
    this.modalImageService.closeModal();
  }

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

  async uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    const result = await this.fileUploadService.updateImage(
      this.imageFile,
      type,
      id
    );
    if (result) {
      Swal.fire('Changes saved', result.msg, 'success');
      this.modalImageService.newImage.emit(result.fileName);
      this.closeModal();
    } else {
      Swal.fire('Error', 'Fail uploading image', 'error');
    }
  }
}
