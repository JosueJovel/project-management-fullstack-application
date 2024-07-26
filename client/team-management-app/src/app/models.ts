export interface CredentialsDto {
  username: string;
  password: string;
}

export interface ProfileDto {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface BasicUserDto {
  id: number;
  profile: ProfileDto;
  isAdmin: boolean;
  active: boolean;
  status: string;
}

export interface FullUserDto {
  id: number;
  profile: ProfileDto;
  isAdmin: boolean;
  active: boolean;
  status: string;
  companies: CompanyDto[];
  teams: TeamDto[];
}

export interface UserRequestDto {
  credentials: CredentialsDto;
  profile: ProfileDto;
  isAdmin: boolean;
}

export interface TeamDto {
  id: number;
  name: string;
  description: string;
  users: BasicUserDto[];
}

export interface TeamRequestDto { //CREATE ENDPOINT SUPPORT(As this request does not come with an auto generated ID)
  name: string;
  description: string;
  users: BasicUserDto[];
}

export interface CompanyDto {
  id: number;
  name: string;
  description: string;
  teams: TeamDto[];
  users: BasicUserDto[];
}

export interface AnnouncementDto {
  id: number;
  date: number;
  title: string;
  message: string;
  author: BasicUserDto;
}

export interface CreateAnnouncementDto {
  title: string;
  message: string;
  author: BasicUserDto;
}

export interface ProjectDto {
  id: number;
  name: string;
  description: string;
  active: boolean;
  team: TeamDto;
}

export interface ProjectRequestDto { //CREATE ENDPOINT SUPPORT(As this request does not come with an auto generated ID)
  name: string;
  description: string;
  active: boolean;
  team: TeamDto;
}