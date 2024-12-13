Clon de instagram

Este proyecto es un clon de la famosa aplicación de Instagram. Fue creado utilizando React para el frontend, y Firebase para el backend, lo que permite la autenticación de usuarios, el almacenamiento de datos y la gestión de perfiles. El diseño está inspirado en la interfaz de Instagram, ofreciendo una experiencia similar para compartir imágenes y realizar interacciones sociales.
Tecnologías utilizadas

    Interfaz:
        React : Framework para construir la interfaz de usuario.
        React Router : Manejo de rutas para la navegación entre las páginas.
        Tailwind CSS : Utilizado para el diseño y el estilo de la interfaz.
        Firebase : Para la autenticación de usuarios, la base de datos y el almacenamiento de archivos. 

    Parte trasera:
        Firebase Authentication : Para gestionar el inicio de sesión y registro de usuarios.
        Firebase Firestore: Base de datos en tiempo real para almacenar la información del usuario.
        Firebase Storage : Para guardar las imágenes subidas por los usuarios. 

Características

    Autenticación de usuarios : Los usuarios pueden registrarse e iniciar sesión usando correo electrónico y contraseña.
    Gestión de perfiles : Los usuarios pueden editar su nombre de usuario, foto de perfil y otras configuraciones.
    Publicación de imágenes : Los usuarios pueden subir imágenes y compartirlas con sus seguidores.
    Dashboard : Los usuarios pueden ver un feed de publicaciones de las personas a las que siguen.
    Páginas de error : Manejo de errores con una página personalizada para el error 404. 

Instalación

    Clona este repositorio:

git clone https://github.com/zinderellasnuff/web_project_clone_instagram.git

Accede a la carpeta del proyecto:

cd web_project_clone_instagram

Instala las dependencias:

npm install

Crea un proyecto en Firebase y configura los servicios de autenticación y Firestore.

Crea un archivo .env en la raíz del proyecto y agrega las credenciales de Firebase que obtuviste en el paso anterior:

REACT_APP_API_KEY=your-api-key
REACT_APP_AUTH_DOMAIN=your-auth-domain
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_APP_ID=your-app-id

Inicia el servidor de desarrollo:

    npm start

    Abra http ://localhost :3000 en su navegador. 
