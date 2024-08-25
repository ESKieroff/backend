se está usando o Windows, é altamente recomendável utilizar o WSL2 (subsistema do Linux) para utilizar o docker diretamente por ele. 
Nesse caso é necessário inicializar o serviço do docker antes de tudo. 
Abra um terminal do linux e digite o comando a seguir: 


yarn install
yarn add reflect-metadata


#### **Modo de Produção:**
- Para construir e rodar o Docker no modo de produção (com apenas as dependências de produção), use:

  ```bash
  docker build --build-arg NODE_ENV=production -t meu-app-prod .
  docker run -p 3000:3000 meu-app-prod
  ```

#### **Modo de Desenvolvimento:**
- Para construir e rodar o Docker no modo de desenvolvimento (com todas as dependências e com o servidor reiniciando automaticamente ao detectar mudanças), use:

  ```bash
  docker build --build-arg NODE_ENV=development -t meu-app-dev .
  docker run -p 3000:3000 meu-app-dev npm run start:dev
  ```

subindo os containers: 

docker compose up -d


pgadmin

usando o pdadmin do container docker, será necessário informar os dados da rede interna dos containers. 
Para obter os nomes, digite no terminal
docker ps

acesse em seu browser o endereço http://localhost:1234/
login: fulano@gmail.com
senha: abc123

registrar o servidor: 
Aba Geral
Nome: postgres
Grupo de Servidores: Servers
Aba Conexão
Host name/address: backend-database-1 
Port: 5432 
Maintenance database: postgres
Username: postgres
Senha: postgres

Caso queira usar o pgadmin já instalado em sua máquina, use as portas expostas pelos containers: 

Aba Geral
Nome: postgres
Grupo de Servidores: Servers
Aba Conexão
Host name/address: localhost
Port: 5435
Maintenance database: postgres
Username: postgres
Senha: postgres


# Usando WSL + Docker

Acesse os recursos do Windows, em "Ativar ou desativar recursos do Windows"
procure e marque a caixa de seleção para esses três itens:
	Plataforma de máquina Virtual
	Plataforma do Hipervisor do Windows
	Subsistema do Windows para Linux

Reinicie o computador

abra o terminal do powershell
digite 
wsl -l --online
wsl --install nameofversion

alternativamente, busque na loja de aplicativos a distro do linux Ubuntu. Recomendamos a xxx
instale
localize no iniciar - abrir
na primeira execução, precisará informar usuário e senha

informar username
informar senha
repeat senha

