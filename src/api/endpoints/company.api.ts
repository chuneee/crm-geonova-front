import api from "../axios.config";
import { Company } from "../types/company.type";

export const CompanyAPI = {
  create: async (companyData: any): Promise<Company> => {
    const { data } = await api.post("/companies", companyData);
    return data;
  },

  findOne: async (id: number = 1): Promise<Company> => {
    const { data } = await api.get(`/companies/${id}`);
    return data;
  },

  update: async (id: string, companyData: any): Promise<Company> => {
    const { data } = await api.patch(`/companies/${id}`, companyData);
    return data;
  },
};
