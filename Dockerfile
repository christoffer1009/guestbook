# Use a imagem Node.js LTS (Alpine)
FROM node:lts-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários para aproveitar o cache de camadas
COPY package*.json ./

# Instalar dependências
RUN apk --no-cache add sqlite \
    && npm install

# Copiar todo o restante dos arquivos
COPY . .

# Crie o arquivo SQLite e inicialize o banco de dados
RUN mkdir -p /usr/src/app/data && \
    touch /usr/src/app/data/guestbook.db && \
    echo "CREATE TABLE IF NOT EXISTS entry (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, message TEXT);" | sqlite3 /usr/src/app/data/guestbook.db


# Expor a porta 3000 (ou a porta que você estiver usando no seu aplicativo)
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "server.js"]
