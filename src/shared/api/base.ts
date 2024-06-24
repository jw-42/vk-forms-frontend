import { GetLaunchParamsResponse } from "@vkontakte/vk-bridge";
import axios from "axios";

class ApiServices {
  private baseUrl;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async checkVKLaunchParams(params: GetLaunchParamsResponse) {
    const response = await axios.post(
      `${this.baseUrl}/auth/checkVKLaunchParams`,
      { params }
    );

    return response;
  }

  async formsGetAll(params: { accessToken: string }) {
    const response = await axios.post(
      `${this.baseUrl}/forms/getAll`,
      {},
      {
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
      }
    );

    return response;
  }

  async formsGetById(params: { form_id: number; accessToken: string }) {
    const response = await axios.post(
      `${this.baseUrl}/forms/getById`,
      { ...params, accessToken: undefined },
      {
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
      }
    );

    return response;
  }

  async formsCreate() {
    return null;
  }

  async formsEdit(params: {
    form_id: number;
    title?: string;
    description?: string;
    accessToken: string;
  }) {
    const response = await axios.post(
      `${this.baseUrl}/forms/edit`,
      { ...params, accessToken: undefined },
      {
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
      }
    );

    return response;
  }
}

export const apiServices = new ApiServices(import.meta.env.VITE_BASE_API_URL);
