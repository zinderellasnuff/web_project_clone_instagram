# Web Project Clone Instagram

Este es un proyecto en desarrollo cuyo objetivo es clonar la funcionalidad básica de Instagram utilizando React. Actualmente, la aplicación incluye un sistema de autenticación de usuario (inicio de sesión y registro) y una vista de dashboard para usuarios autenticados. Se está utilizando Firebase para la gestión de la autenticación y el almacenamiento de datos en la nube.

## Estado del Proyecto

Este proyecto aún está en desarrollo. Actualmente, se han implementado las siguientes características:

- **Autenticación de usuarios**: Funcionalidades de inicio de sesión y registro.
- **Navegación entre páginas**: Usando `react-router-dom` para gestionar las rutas.
- **Estructura basada en React**: Se ha implementado con React, utilizando carga perezosa de componentes (`React.lazy`).
- **Backend con Firebase**: Autenticación y gestión de datos en la nube.

## Características

- **Inicio de sesión (Login)**: Los usuarios pueden iniciar sesión con su cuenta de correo electrónico y contraseña.
- **Registro de usuario (SignUp)**: Los usuarios pueden crear una cuenta para acceder a la plataforma.
- **Dashboard**: Los usuarios autenticados tienen acceso a su panel de control personal.
- **Firebase Authentication**: Se utiliza Firebase para la autenticación de los usuarios.
- **Manejo de rutas**: Utiliza `react-router-dom` para la gestión de rutas y vistas en la aplicación.
- **Carga perezosa (Lazy Loading)**: Se implementa con `React.lazy` para mejorar el rendimiento al cargar componentes solo cuando son necesarios.
- **Contexto de usuario (UserContext)**: La Context API maneja el estado global del usuario a través de la aplicación.
- **Estilo modular**: Se emplean estilos CSS modulares para una estructura más limpia y expansible.

## Tecnologías utilizadas

- **React**: Framework de JavaScript para construir interfaces de usuario interactivas.
- **React Router**: Manejo de la navegación entre páginas.
- **React Suspense**: Implementación de carga perezosa de componentes.
- **Firebase**: Plataforma para la autenticación de usuarios y gestión de datos en la nube.
- **Context API**: Para manejar el estado global del usuario y compartirlo entre los diferentes componentes de la aplicación.
- **CSS**: Para el diseño y estilo de la interfaz de usuario.

## Estructura del Proyecto

src/
├── components/
│   ├── post/
│   ├── profile/
│   ├── sidebar/
│   │   ├── Header.jsx
│   │   └── Timeline.jsx
├── constants/
│   ├── paths.js
│   └── routes.js
├── context/
│   ├── FirebaseProvider.jsx
│   ├── UserProvider.jsx
│   ├── firebase.js
│   └── user.js
├── helpers/
│   ├── IsUserLoggedIn.jsx
│   └── ProtectedRoute.jsx
├── hooks/
│   ├── useFirebase.js
│   ├── usePhotos.js
│   └── useUser.js
├── lib/
│   └── firebaseConfig.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Profile.jsx
│   └── SignUp.jsx
└── services/
├── App.jsx
├── index.css
├── main.jsx
└── seed.js

public/
└── images/ <-- Aquí se almacenan las imágenes para la aplicación.


## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/instagram-clone.git
