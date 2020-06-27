# First `socket.io`

Bem este é um exemplo básico de comunicação em tempo real de cliente e servidor.

Para compreender este código é necessário que se saiba o básico de programação Web, pois só vou fazer algumas demonstrações dessa ferramenta fantastica que é o socket.io.

Vamo lá, comece inicializando um projeto `node` em um diretório de sua preferência e com o nome de sua preferência, este aqui se chama `first-socket.io`.

```bash
mkdir first-socket.io && cd first-socket.io && yarn init -y
```

Agora instale as seguintes dependências:

```bash
yarn add express ejs socket.io
```

Na raiz do seu projeto crie um arquivo `index.js`:

```js
// importando o express
const express = require('express');
//executando express
const app = express();
// criando um servidor http
const http = require('http').Server(app);
// criando uma conexão socket
const io = require('socket.io')(http);

// ouvindo um evento de conexão
io.on('connection', socket => {
  // mostrando uma mensagem no terminal do server
  console.log('a new user has been connected')
  // enviando uma mensagem a cada 2,5s para quem fez essa conexão
  setInterval(()=> socket.emit('msg', {hello: 'socket.io'}), 2500);
  // escutando um evento de 'msg' de quem fez essa conexão
  socket.on('msg', msg => console.log(msg))
});

// setando a engine EJS
app.set('view engine', 'ejs')

// renderizando a view HOME quando alguém abrir no navegador http://localhost:3000/
app.get('/', (req, res)=> res.render('home'));

// server http ouvindo na porta 3000
http.listen(3000, ()=> console.log('running...'))
```

Agora na raiz do seu projeto crie um diretório com o nome `views`, e dentro desse diretório crie um arquivo `home.ejs` com o seguinte conteúdo:

```html
<!-- Estrutura básica de um html -->
<html>
  <body>
    <!-- Importando o socket.io -->
    <script src="/socket.io/socket.io.js"></script>
    <script>
      // instanciando a conexão com o servidor
      const socket = io()
      // escutando um evento de 'msg'
      socket.on('msg', msg => {
        // exibindo no console do navegador a variavel com o conteudo de 'msg'
        console.log(msg)
        // enviando uma mensagem em um intervalo de 2.5s para o servidor.
        setInterval(()=> socket.emit('msg', {hello: 'node'}), 2500)
      })
    </script>
  </body>
</html>
```

Show, agora podemos observar no terminal do servidor o seguinte comportamento quando alguém acessa [http://localhost:3000/](http://localhost:3000):

![terminal](https://i.imgur.com/51i5ww2.png).

E no console do navegador o seguinte comportamento:

![navegador](https://i.imgur.com/LrMgnkj.png)


Muito legal né ? agora temos uma comunicação em tempo real com o servidor a cada 2.5s.