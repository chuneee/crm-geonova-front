import api from "../axios.config";
import { NotificationPreferences } from "../types/notification-preferences.type";
import { User } from "../types/user.types";

const apiEndpoint = "users";

export const UserAPI = {
  // User Info
  findAllUsers: async (): Promise<User[]> => {
    const { data } = await api.get(`/${apiEndpoint}`);
    return data;
  },

  // Notification Preferences
  findNoticationPreferences: async (): Promise<NotificationPreferences> => {
    const { data } = await api.get(`/${apiEndpoint}/notification-preferences`);
    return data;
  },

  updateNoticationPreferences: async (
    preferencesData: Partial<NotificationPreferences>
  ): Promise<NotificationPreferences> => {
    const { data } = await api.patch(
      `/${apiEndpoint}/notification-preferences`,
      preferencesData
    );
    return data;
  },
};
