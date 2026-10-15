export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Farm {
  id: string;
  name: string;
  locationName: string;     
  coordinates: Coordinates;
  crop: string;
  areaHectares: number;
  plantingDate: string;     
}