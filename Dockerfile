# Utilizamos una imagen base de Node.js 20
FROM node:lts AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

RUN npm run build

# Segunda etapa del Dockerfile
FROM node:lts-alpine

# Creamos un usuario no privilegiado para ejecutar la aplicación
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos los archivos package.json y package-lock.json
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Cambiamos el propietario de los archivos al usuario no privilegiado
RUN chown -R nodejs:nodejs /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Cambiamos al usuario no privilegiado
USER nodejs

# Exponemos el puerto en el que la aplicación va a correr
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
