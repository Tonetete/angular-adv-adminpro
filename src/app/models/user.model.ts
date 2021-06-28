import { environment } from 'src/environments/environment';

const base_url = environment.base_api_url;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) {}

  getImage() {
    const regex = new RegExp('^https?://');
    if (this.img && regex.test(this.img)) {
      return this.img;
    }

    if (this.img) {
      return `${base_url}/upload/users/${this.img}`;
    }
    return `${base_url}/upload/users/no-image-available.png`;
  }
}
