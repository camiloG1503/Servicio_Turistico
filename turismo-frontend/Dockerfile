# Usar la imagen de Node.js para construir el frontend
FROM node:20 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen ligera de Nginx para servir el frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para el servicio web
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]