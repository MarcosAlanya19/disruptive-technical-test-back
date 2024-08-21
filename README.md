## Prueba Técnica
La aplicación se desarrolló con Node.js con Express y MongoDB como base de datos.

## Objetivo
> El objetivo de este proyecto es permitir que un administrador cree categorías de contenido y temáticas, y que los usuarios con diferentes roles (lectores, creadores, administradores) accedan y gestionen dicho contenido según sus permisos.

## Instalación

```sh
npm install
```

## Inicio
```sh
npm start
```

## Configuración del entorno
Crea un archivo .env en la raíz del proyecto basado en el archivo .env.example. Aquí es donde puedes configurar las variables de entorno necesarias para conectar con front y asimismo activar permisos de jswt y cors_origin.
Por momento para pruebas en local, tiene data default en config.ts
```
PORT=3000
ENV=dev
TOKEN_SECRET=your_secret_key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
URL_MONGO="mongodb://d-user:d-password@localhost:27017/disruptive?authSource=admin"
```
En la variable **URL_MONGO** va la url de conexion de la base de datos
En la variable **CORS_ORIGIN** cuando la variable se necesita asignar el dominio de la web que va consumir esta API
## Flujo
- Archivo collection_example para tener configuracion base en postman

## Tecnologías
- Backend: Node.js, Express, MongoDB

👤 **Marcos Alanya**

* Website: https://marcos-alanya-portafolio.vercel.app/
* Github: [@MarcosAlanya19](https://github.com/MarcosAlanya19)
* LinkedIn: [@marcosAlanya19](https://linkedin.com/in/marcosAlanya19)
