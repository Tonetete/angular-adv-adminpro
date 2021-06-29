import { Component, EventEmitter, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { PreviewImageService } from 'src/app/services/preview-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  constructor(
    public previewImageService: PreviewImageService,
    public fileUploadService: FileUploadService,
    public modalImageService: ModalImageService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.previewImageService.resetImages();
  }

  closeModal() {
    this.previewImageService.resetImages();
    this.modalImageService.closeModal();
  }

  changePreviewImage(event: Event) {
    // const target = event.target as HTMLInputElement;
    // if (target && target.files?.length) {
    //   this.imageFile = target.files[0];
    //   const reader = new FileReader();
    //   const url64 = reader.readAsDataURL(this.imageFile);
    //   reader.onloadend = () => {
    //     this.previewImage = reader.result;
    //   };
    // } else {
    //   this.previewImage = null;
    // }
    this.previewImageService.changePreviewImage(event);
  }

  async uploadImage() {
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    if (this.previewImageService.imageFile) {
      const result = await this.fileUploadService.updateImage(
        this.previewImageService.imageFile,
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
}
