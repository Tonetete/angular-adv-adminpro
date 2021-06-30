export type Role = 'USER_ROLE' | 'ADMIN_ROLE';
export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: Role,
    public uid?: string
  ) {}
}
