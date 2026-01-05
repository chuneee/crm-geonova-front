/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;

  // Agrega aquí otras variables de entorno que uses
  // readonly VITE_OTRA_VARIABLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
