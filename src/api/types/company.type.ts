export interface Company {
  id: string;
  brand_name: string;
  business_name: string;
  rfc_init: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state_province: string;
  zip_code: string;
  website?: string;
  logo_url: string;
  active: boolean;
  created_at: string;
  updated_at: string;

  settings?: CompanySettings;
}

export interface CompanySettings {
  id: string;
  type_currency: string;
  timezone: string;
  date_format: string;
  language: string;
  created_at?: string;
  updated_at: string;
}
