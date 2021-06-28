import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styles.scss'],
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public user!: User;
  public imageFile!: File;
  public previewImage!: string | null | ArrayBuffer;

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    const { email, name } = this.user;
    this.profileForm = this.formBuilder.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value).subscribe(
      (response: any) => {
        this.user.name = response.user.name;
        this.user.email = response.user.email;
        Swal.fire('Changes saved', 'User modified', 'success');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
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
    const result = await this.fileUploadService.updateImage(
      this.imageFile,
      'users',
      this.user.uid || ''
    );
    if (result) {
      this.user.img = result.fileName;
      Swal.fire('Changes saved', result.msg, 'success');
    } else {
      Swal.fire('Error', 'Fail uploading image', 'error');
    }
  }
}
