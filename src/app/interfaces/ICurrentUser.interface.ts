import { Role } from '../../user/enums/Role.enum';

export interface ICurrentUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}
