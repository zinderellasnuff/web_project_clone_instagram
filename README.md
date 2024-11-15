# Web Project Clone Instagram

Este es un proyecto en desarrollo que tiene como objetivo clonar la funcionalidad básica de Instagram utilizando React. Actualmente, la aplicación incluye un sistema de autenticación de usuario (login y registro) y una vista de dashboard para usuarios autenticados. Se está utilizando Firebase para la gestión de la autenticación y el almacenamiento de datos en la nube.

## Estado del Proyecto

Este proyecto aún está en desarrollo. Actualmente, se han implementado las siguientes características:

- Autenticación de usuarios (Inicio de sesión y Registro).
- Navegación entre las páginas mediante React Router.
- Estructura de la aplicación basada en React, con carga perezosa de componentes (Lazy Loading).
- Firebase como backend para la autenticación y la gestión de usuarios.

## Características

- **Inicio de sesión (Login):** Permite a los usuarios iniciar sesión con su cuenta.
- **Registro de usuario (SignUp):** Los usuarios pueden crear una cuenta para acceder a la plataforma.
- **Dashboard:** Los usuarios autenticados tienen acceso a su panel de control.
- **Firebase Authentication:** Se utiliza Firebase para la autenticación de los usuarios, lo que permite iniciar sesión con correos electrónicos y contraseñas.
- **Manejo de rutas:** Utiliza `react-router-dom` para gestionar las rutas entre las diferentes vistas de la aplicación.
- **Carga perezosa (Lazy Loading):** Se usa `React.lazy` para cargar de manera perezosa las páginas, mejorando el rendimiento.
- **Contexto de usuario (UserContext):** Utiliza la Context API para manejar el estado global del usuario a través de la aplicación.
- **Estilo modular:** Se utilizan estilos CSS para la estructura de la interfaz de usuario, con un enfoque modular para facilitar la expansión del proyecto.

## Tecnologías utilizadas

- **React:** Framework de JavaScript para construir interfaces de usuario interactivas.
- **React Router:** Manejo de la navegación entre páginas.
- **React Suspense:** Implementación de carga perezosa de componentes.
- **Firebase:** Plataforma para autenticar usuarios y gestionar datos en la nube.
- **Context API:** Para manejar el estado global del usuario y compartirlo entre componentes.
- **CSS:** Para el diseño y estilo de la aplicación.

