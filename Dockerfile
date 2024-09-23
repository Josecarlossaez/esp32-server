# De donde viene mi proyecto
FROM node:20
# Creamos el directorio de trabajo
WORKDIR /app
# Pasamos los archivos al directorio de trabajo => para que que copie todos los archivos que empiecen con package los copias, para eso se usa *
COPY package*.json ./
# Ejecutamos el comando, así se instalan todas las dependencias de nuestro proyecto en el contenedor
RUN npm install
# Copiamos todo dentro del contenedor, pero no queremos pasar node_modules, así que creamos .dockerignore y le decimos los archivos o carpetas que no queremos pasar al contenedor
COPY . . 
# Para arrancar el sistema, le pasamos el script creado para arrancar nuestro proyecto
CMD ["npm", "start"]

