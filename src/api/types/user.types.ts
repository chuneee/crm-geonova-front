export interface User {
  id: string;
  names: string;
  surnames: string;
  email: string;
  role: string;
  profile_image_url?: string;
  phone?: string;
  active: boolean;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
}
