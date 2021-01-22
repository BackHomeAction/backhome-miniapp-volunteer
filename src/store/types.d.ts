import { Volunteer } from "@/api/types/models"

export interface RootState {
  version?: string;
}

export interface UserState {
  logged: boolean;
  hasVolunteerInfo: boolean;
  userInfo?: null | Volunteer;
}
