export interface UserData {
    UserID: string;
    Id: number;
    Type: string;
    SocialId: string;
    Email: string;
    ProfilePictureURL: string;
    Phone: string;
    FullName: string;
    CountryCode: string;
    MainCountryId: number;
    Verified: "none" | "pending" | "verified";
    VerificationInfo: any;
    Birthday: string | null;
    Status: "active" | "inactive" | string;
    LastVerificationActionAt: string | null;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    IsDeleted: boolean;
  }
  
  export type UserDevice = {
    Id: number;
    UserID: string;
    DeviceType: string;
    DeviceName: string;
    DeviceUniqueId: string;
    FirebaseToken: string;
    IsLoggedIn: boolean;
    LoggedInAt: string;
    CreatedAt: string;
    DeletedAt: string | null;
  };