import { Role, Gender } from 'src/core/common/enums';

export class User {
  id: number;
  email: string;
  password: string;
  role: Role;
  username: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}
