# Use uma imagem base oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
# Utilize --only=production para evitar instalar dependências de desenvolvimento
RUN npm install --only=production

# Copie todo o código fonte do projeto para o diretório de trabalho
COPY . .

# Exponha a porta padrão do Nest.js (geralmente 3000, mas pode ser configurada)
EXPOSE 3000

# Comando para iniciar o servidor Nest.js em modo de produção
CMD ["npm", "run", "start:prod"]
