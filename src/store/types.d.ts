import { Volunteer, Notice, Banner, Case } from "@/api/types/models"

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

export interface CommonState {
  count: {
    onlineVolunteerNumber: number;
    totalVolunteerNumber: number;
    openingTaskNumber: number;
  };
}

export interface MissionState {
  myMissions: Array<Case>;
  myMissionIDs: Set<number>;
  myUncheckedMissions: Array<Case>;
  currentMission: any;
}
