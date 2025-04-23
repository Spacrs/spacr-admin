export interface Media {
  Id: number;
  mediaId: string;
  description: string | null;
  url: string;
  Name: string;
  Type: string;
  UserID: string | null;
  RelationId: string;
  isPublic: boolean;
  category: string;
  CreatedAt: string;
  UpdatedAt: string;
  IsDeleted: boolean;
}

export interface City {
  name: string;
  cityId: number;
  countryName: string;
  countryId: number;
}

export interface ProductData {
  Id: number;
  OrderID: string;
  TrackingID: string;
  UserID: string | null;
  ProductName: string;
  Descriptions: string;
  ProductUrl: string;
  Price: number;
  DeliveryReward: number;
  Quantity: number;
  IsWithBox: boolean;
  EstimatedDeliveryDate: string | null;
  Status: string;
  CreatedBy: string;
  ExpiredDate: string | null;
  From_CityId: number;
  From_CountryId: number;
  To_CityId: number;
  To_CountryId: number;
  From_address: string;
  To_address: string;
  IsTrending: boolean;
  IsDeleted: boolean;
  CreatedAt: string;
  UpdatedAt: string;
  sP_CountryId: number | null;
  sP_CityId: number | null;
  From_City: City;
  From_Country: any | null; 
  To_City: City;
  To_Country: any | null;
  User: any | null; 
  totalOfferCount: number;
  OrderOffer: any[]; 
  medias: Media[];
  image?: string;
}
