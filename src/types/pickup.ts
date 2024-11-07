export interface Time {
  start_hour: string;
  end_hour: string;
  open_all_day: boolean;
}

export interface Timetable {
  start_date: string;
  end_date: string;
  times: Time[];
}

export interface Town {
  id: number;
  name: string;
  zip_code: string;
}

export interface TownData {
  zip_code: string;
  name: string;
}

export interface PickupPoint {
  id: number;
  name: string;
  observations: string;
  street: string;
  number: string;
  floor: string;
  town: number;
  town_data?: TownData;
  timetables: Timetable[];
  latitude?: number;
  longitude?: number;
}

export interface Report {
  id: number;
  description: string;
}