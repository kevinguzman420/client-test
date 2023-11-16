import axios from "axios";
import Cookies from "js-cookie";

export const loadAxiosSettings = () => {
  const token = Cookies.get("access_token");
  const refresh_token = Cookies.get("refresh_token");

  if (token && refresh_token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  //   axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
};

// -----------------------------------------------------------------------------

// // apiService.js

// import axios from 'axios';

// const apiService = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   withCredentials: true,
// });

// // Configurar un interceptor para todas las solicitudes
// apiService.interceptors.request.use(
//   async (config) => {
//     // Antes de cada solicitud, intentar renovar el token utilizando el token de actualización
//     try {
//       await renewAccessToken();
//     } catch (error) {
//       console.error('Error al renovar el token:', error);
//       // Puedes manejar el error de renovación de tokens aquí (redirigir al usuario al inicio de sesión, etc.)
//       throw error;
//     }

//     // Incluir el token de acceso en todas las solicitudes
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Función para renovar el token de acceso utilizando el token de actualización
// const renewAccessToken = async () => {
//   const refreshToken = getRefreshToken();

//   if (!refreshToken) {
//     // No hay token de actualización disponible, por lo que no se puede renovar el token de acceso
//     return;
//   }

//   // Intentar renovar el token de acceso usando el token de actualización
//   const response = await apiService.post('/refresh', { refresh_token: refreshToken });

//   // Actualizar el token de acceso almacenado
//   const newAccessToken = response.data.access_token;
//   setAccessToken(newAccessToken);
// };

// // Funciones de utilidad para obtener, establecer y borrar tokens en el almacenamiento local
// const getAccessToken = () => localStorage.getItem('access_token');
// const setAccessToken = (token) => localStorage.setItem('access_token', token);
// const getRefreshToken = () => localStorage.getItem('refresh_token');
// const setRefreshToken = (token) => localStorage.setItem('refresh_token', token);
// const clearTokens = () => {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('refresh_token');
// };

// export default apiService;
