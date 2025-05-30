# 🎬 My-fillm

---

## 🧭 Introducción

My-fillm es una aplicación móvil de streaming desarrollada con React Native utilizando Expo.  
Su propósito es ofrecer una experiencia simple y funcional para descubrir, visualizar y guardar películas favoritas.  
La app está orientada a usuarios que buscan una plataforma intuitiva para acceder a contenido multimedia, y a desarrolladores que deseen mantener o expandir la aplicación.

---

## ⚙️ Requisitos

### Software necesario

- Node.js v16+  
- Expo CLI (`npm install -g expo-cli`)  
- Git  
- Android Studio (para emulador o build Android)  
- Firebase Console (para autenticación)  
- VS Code (recomendado)  

### Dependencias clave

#### 🔧 Funcionales

- `axios` – Llamadas HTTP a la API.  
- `firebase` – Autenticación con correo/contraseña y BD con links para reproducción del contenido (Teasers).  
- `@react-native-async-storage/async-storage` – Almacenamiento local.  
- `react-native-dotenv` – Variables de entorno desde `.env`.  
- `expo-av`, `react-native-video`, `react-native-video-controls` – Reproducción de video.  

#### 🎨 UI / Navegación

- `@react-navigation/native`, `bottom-tabs`, `stack`, `native-stack` – Sistema de navegación.  
- `react-native-gesture-handler`, `react-native-screens`, `safe-area-context` – Requisitos para navegación.  
- `@expo/vector-icons` – Íconos vectoriales.  
- `react-native-toast-message`, `react-native-flash-message` – Notificaciones emergentes.  
- `expo-linear-gradient`, `expo-status-bar` – Estética y UI nativa.  

#### 🧪 Testing

- `jest`, `jest-expo` – Pruebas unitarias.  

#### 📂 Otros

- `expo-device`, `expo-notifications`, `expo-image-picker`, `expo-document-picker` – Permisos, archivos y multimedia.  
- `react-native-permissions` – Manejo de permisos específicos.  
- `metro`, `metro-core`, `metro-runtime` – Configuración de bundler.  

---

## 🚀 Instalación y ejecución

```bash
git clone https://github.com/santiagobedoyag10/Myfim.git
cd my-fillm
npm install
npx expo start
```

### Variables de entorno

Crear un archivo `.env` con tus configuraciones:

```
EXPO_PUBLIC_AUTH_DOMAIN=''
EXPO_PUBLIC_API_KEY=''
EXPO_PUBLIC_PROYECT_ID=''
EXPO_PUBLIC_STORAGE_BUCKET=''
EXPO_PUBLIC_MESSAGING_SANDER_ID=''
EXPO_PUBLIC_APP_ID=''
EXPO_PUBLIC_MEASUREMENT_ID=''
EXPO_PUBLIC_TOKEN_MOVIES=''
EXPO_PUBLIC_KEY_GOOGLE_LOGIN=''
EXPO_PUBLIC_CLOUDDINARYURL=''
EXPO_PUBLIC_UPLOAD_PRESET=''
```
---

## 🧱 Estructura del Proyecto

```
/src
  /components     # Componentes reutilizables (Cards, Modales, Botones, etc.)
  /context        # Gestión de estado global y contexto de la App
  /screens        # Home, Login, Register, Details, etc.
  /navigate       # Configuración de rutas de navegación
  /services       # Llamadas a API y Firebase
  /utils          # Funciones auxiliares
App.js            # Punto de entrada
```
---

## 🔁 Navegación

Usa `react-navigation`:

- **Stack Navigator**: para flujo principal (Login → Home → Details)
- **Bottom Tab Navigator**: para navegación entre secciones (Home, Favoritos, Perfil)

---

## 🧩 Pantallas Principales

### 🏠 Home
- Muestra películas por categoría y tendencias.
- Usa carruseles horizontales.
- Conecta a la API para obtener los datos.

### 🔐 Login
- Permite autenticación vía correo/contraseña.
- Implementado con Firebase Authentication.

### 📝 Register
- Formulario de registro de nuevos usuarios.
- Valida correo, contraseña y almacena el usuario en Firebase.

### 🎞️ Details
- Muestra información detallada de una película.
- Permite reproducir el video (usando `expo-av` o `react-native-video`).
- Botón para agregar/quitar de la lista de favoritos.

---

## 🔌 Servicios

### API – `service.js`
```javascript
import axios from 'axios';

const API = axios.create({ baseURL: process.env.API_URL });

export const getMovieDetails = (id) => API.get(`/movie/${id}`);
```

## 🧠 Gestión de estado
- Se utiliza Context API para manejar el estado del usuario autenticado y la lista de favoritos.

- AsyncStorage se usa para mantener la sesión del usuario.

---

## 🧪 Pruebas Unitarias
- Pruebas realizadas con jest.

```bash
npm run test
npm run test:watch
npm run test:coverage
```
### Manuales
- Validación en Expo Go y emulador Android:
  - Visualización de películas
  - Reproducción de video
  - Favoritos persistentes

---

## 📤 Despliegue

### Android
- Build realizado mediante Expo:

```bash
npx expo build:android
```

- Distribución interna o carga manual en Google Play Console.

> 🔒 La app aún no se ha desplegado en iOS ni publicada oficialmente en tiendas.

---

## 📚 Anexos

- [React Native](https://reactnative.dev)
- [Expo](https://docs.expo.dev)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [React Navigation](https://reactnavigation.org)
- [Jest Testing](https://jestjs.io)

---

## 🧭 Futuras funcionalidades (roadmap)

- ✅ Lista de favoritos persistente  
- ✅ Pantalla de perfil y ajustes  
- 🔲 Modo oscuro  
- 🔲 Soporte para múltiples idiomas  
- 🔲 Publicación en App Store
