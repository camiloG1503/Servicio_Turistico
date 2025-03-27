# Usa Node.js 20 como base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código de la API
COPY . .

# Expone el puerto en el contenedor
EXPOSE 5000

# Comando para iniciar la API
CMD ["node", "server.js"]
