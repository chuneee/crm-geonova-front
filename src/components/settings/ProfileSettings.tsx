import { Camera, Mail, Phone, AlertTriangle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { AuthAPI } from "../../api/endpoints/auth.api";

export function ProfileSettings() {
  const { user } = useAuth();

  const [userData, setUserData] = useState({
    names: user?.names || "",
    surnames: user?.surnames || "",
    email: user?.email || "",
    phone: user?.phone || null,
    role: user?.role || "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorProfile, setErrorProfile] = useState("");

  const handelSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit password");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
    console.log("Contraseña válida");

    const data = {
      currentPassword,
      newPassword,
    };

    try {
      const response = await AuthAPI.updatePassword(data);

      console.log("Contraseña actualizada", response);
    } catch (error: any) {
      console.error("Error al actualizar la contraseña", error);

      setError("Error al actualizar la contraseña");

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      }
    } finally {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    // Lógica para manejar el envío del formulario de cambio de contraseña
  };

  const handelSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit profile");

    try {
      const dataToSend = {
        ...userData,
        ...(userData.phone ? { phone: userData.phone } : {}),
      };

      console.log("Datos a enviar:", dataToSend);

      if (user == userData) {
        console.log("No hay cambios en la información del perfil");
        return;
      }
    } catch (error: any) {
      console.error("Error al actualizar la información del perfil", error);
      setErrorProfile("Error al actualizar la información del perfil");

      if (error.response?.data?.message) {
        setErrorProfile(error.response.data.message);
      }
    }
  };

  const onFormChange = (inputName: string, value: string) => {
    setUserData((prev) => ({ ...prev, [inputName]: value }));
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#1E293B] mb-1">Información Personal</h2>
        <p className="text-sm text-[#64748B]">
          Actualiza tu información de perfil y foto
        </p>
      </div>

      {/* Profile Photo */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Foto de Perfil</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-2xl">
              {userData?.names.charAt(0)}
              {userData?.surnames.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3B82F6] text-white rounded-full flex items-center justify-center hover:bg-[#2563EB] transition-colors shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm text-[#1E293B] mb-1">
              {userData?.names} {userData?.surnames}
              <span
                style={{ fontSize: 12 }}
                className="ml-2 rounded-lg border border-[#E2E8F0] p-2 text-[#1E293B]"
              >
                {userData?.role}
              </span>
            </p>
            <p className="text-xs text-[#64748B] mb-3">
              JPG o PNG. Tamaño máximo 2MB
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-[#3B82F6] text-white rounded text-xs hover:bg-[#2563EB] transition-colors">
                Cambiar Foto
              </button>
              <button className="px-3 py-1.5 text-[#64748B] border border-[#E2E8F0] rounded text-xs hover:bg-[#F8FAFC] transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}

      <form onSubmit={handelSubmitProfile} className="space-y-6">
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
          <h3 className="text-sm text-[#1E293B] mb-4">Información Personal</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Nombre
              </label>
              <input
                type="text"
                minLength={3}
                defaultValue={userData?.names}
                onChange={(event) => onFormChange("names", event.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Apellidos
              </label>
              <input
                type="text"
                defaultValue={userData?.surnames}
                onChange={(event) =>
                  onFormChange("surnames", event.target.value)
                }
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs text-[#64748B] mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="email"
                  defaultValue={userData?.email}
                  onChange={(event) =>
                    onFormChange("email", event.target.value)
                  }
                  className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="tel"
                  defaultValue={userData?.phone || ""}
                  onChange={(event) =>
                    onFormChange("phone", event.target.value)
                  }
                  className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Puesto
              </label>
              <input
                type="text"
                defaultValue={userData?.role}
                onChange={(event) => onFormChange("role", event.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>

          {errorProfile && (
            <div className="flex items-center bg-[#EF4444] p-2  rounded-md border text-white border-[#B91C1C]">
              <AlertTriangle
                color="white"
                size={20}
                strokeWidth={2}
                className="inline mr-2"
              />
              <strong className="text-red-500 text-xs">{errorProfile}</strong>
            </div>
          )}
          <button
            type="submit"
            disabled={userData === user}
            className="mt-4 px-4 py-2 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors"
          >
            Actualizar Informacion
          </button>
        </div>
      </form>

      {/* Password */}
      <form onSubmit={handelSubmitPassword}>
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
          <h3 className="text-sm text-[#1E293B] mb-4">Cambiar Contraseña</h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-xs text-[#64748B] mb-2"
              >
                Contraseña Actual
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                minLength={8}
                required
                placeholder="••••••••"
                autoComplete="currendPassword"
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs text-[#64748B] mb-2"
                >
                  Nueva Contraseña
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs text-[#64748B] mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  required
                  minLength={8}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent ${
                    error ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center bg-[#EF4444] p-2  rounded-md border text-white border-[#B91C1C]">
                <AlertTriangle
                  color="white"
                  size={20}
                  strokeWidth={2}
                  className="inline mr-2"
                />
                <strong className="text-red-500 text-xs">{error}</strong>
              </div>
            )}

            <button
              type="submit"
              className="px-4 py-2 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors"
              onClick={() => setError("")}
            >
              Actualizar Contraseña
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
