# Utilizamos una imagen base de Node.js 20
FROM node:lts

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Exponemos el puerto en el que la aplicación va a correr
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm","run","dev"]
