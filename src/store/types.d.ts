import { Volunteer, Notice, Banner } from "@/api/types/models"

export interface RootState {
  version?: string;
}

export interface UserState {
  logged: boolean;
  hasVolunteerInfo: boolean;
  userInfo?: null | Volunteer;
}

export interface AvatarCropperState {
  path: string;
}

export interface AnnouncementState {
  announcements: Array<Notice>;
  banners: Array<Banner>;
}

export interface LocationState {
  location: {
    longitude: number;
    latitude: number;
  };
}
