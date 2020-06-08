# Next Level Week 1

Esse projeto é resultado da primeira Next Leve Week da equipe RocketSeat. Nele foram aplicadas as tecnologias de NodeJs, Reactjs, React Native e Sqlite3 (através do query builder [knex]) para construção de uma aplicação chamada **Ecoleta**, que tem objetivo de permitir que empresas responsáveis por coleta de resíduos específicos se cadastrem na plataforma e sejam encontradas e contatadas por usuários através do aplicativo. 

### Requisitos

* [NodeJs] - Nodejs 10 ou superior;
* [Expo] - Aplicativo Expo instalado em seu dispositivo móvel;

### Instalação

Clonar este projeto, rodar o comando npm install ou yarn install na pasta **server**, **web** e **mobile** para que sejam baixadas as dependências necessárias. Voltando para a pasta **server**, 
execute o comando npm run knex:migrate ou yarn knex:migrate para que seja criado o arquivo .sqlite, onde ficará seu banco de dados. Em seguida execute o comando npm run knex:seed ou yarn knex:seed para que a tabela de items seja populada com os itens iniciais, por fim, execute o comando npm run dev ou yarn dev para que o servidor seja iniciado na porta 3001 (o que pode ser alterado no arquivo server.tsx).
Agora, dentro da pasta web, execute o comando npm start ou yarn start para que o sistema seja executado em seu navegador.
Por fim, dentro da pasta mobile, execute o comando npm start ou yarn start para que o servidor metro seja executado e você possa escanear o QRCode com seu aplicativo do expo e execute o aplicativo.

### Contato
welingtonfidelis@gmail.com
Sujestões e pull requests são sempre bem vindos =) 

License
----

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[Expo]: <https://expo.io/>
[NodeJs]: <https://nodejs.org/en/>
[knex]: <http://knexjs.org/>
[Sequelize]: <https://sequelize.org/>
[Postman]: <https://www.postman.com/downloads/>
[neste link]: <https://drive.google.com/open?id=1rk6cejuRqE5NdKsT3qaU5ge-b2jGpaKR>

;
