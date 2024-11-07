import axios from 'axios';
import type { PickupPoint, Town, Report } from '../types/pickup';

const API_URL = 'http://localhost:8000/api/v1';

export interface ListParams {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ListResponse<T> {
  count: number;
  results: T[];
}

export const api = {
  async getPickupPoints(params: ListParams = {}) {
    const response = await axios.get<ListResponse<PickupPoint>>(`${API_URL}/pickup_point/`, { params });
    return response.data;
  },

  async getPickupPoint(id: number) {
    const response = await axios.get<PickupPoint>(`${API_URL}/pickup_point/${id}/`);
    return response.data;
  },

  async createPickupPoint(data: PickupPoint) {
    const response = await axios.post<PickupPoint>(`${API_URL}/pickup_point/`, data);
    return response.data;
  },

  async createReport(data:  Report) {
    const response = await axios.post<Report>(`${API_URL}/report/`, data);
    return response.data;
  },

  async searchTowns(query: string) {
    const params = query.match(/^\d+/) ? { codp: query } : { loc: query };
    const response = await axios.get<Town[]>(`${API_URL}/town/`, { params });
    return response.data;
  },
  // New function to download CSV file
  async downloadPickupPointsCSV() {
    const response = await axios.get(`${API_URL}/pickup_point/csv/`, {
      responseType: 'blob', // Important for file downloads
    });

    // Create a URL for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pickup_points.csv'); // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // New function to download JSON file
  async downloadPickupPointsJSON() {
    const response = await axios.get(`${API_URL}/pickup_point/json/`, {
      responseType: 'blob', // Important for file downloads
    });

    // Create a URL for the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'pickup_points.json'); // Specify the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};