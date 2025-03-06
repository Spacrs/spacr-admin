export type UserType = {
  UserID: string;
  Id: number;
  Type: "apple" | "google" | "facebook" | "email";
  SocialId: string;
  Email: string;
  ProfilePictureURL: string;
  Phone: string;
  FullName: string;
  CountryCode: string | null;
  MainCountryId: string | null;
  Verified: "none" | "pending" | "verified";
  VerificationInfo: string | null;
  Birthday: string | null;
  Status: "active" | "inactive";
  LastVerificationActionAt: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  IsDeleted: boolean;
};

export type Users = UserType[];
