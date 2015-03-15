var zetta = require('zetta');

zetta()
  .name('<%= zetta.serverName %>')
  .listen(<%= zetta.serverPort %>, function(){
     console.log('Zetta is running..');
});
