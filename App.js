'use strict'
const Hapi=require('hapi');
const auth=require('hapi-auth-basic');
const server=new Hapi.Server();
var rubrica=[
    {
        'nome':'gallo',
        'professione':'rompiballe'
    }
];
server.connection({host: process.env.HOST,port:process.env.PORT});
server.route({
    method:'GET',
    path:'/{nome}',
    handler:function(request,reply)
    {
        reply('Hi '+encodeURIComponent(request.params.nome)+'!');
    }
});
server.route({
    method:'GET',
    path:'/',
    handler:function(request,reply)
    {
        reply(encodeURIComponent('Hi!'));
    }
});
server.route({
    method:'GET',
    path:'/post',
    handler:function(request,reply)
    {
        reply(JSON.stringify(rubrica));
    }
});
server.route({
    method:'POST',
    path:'/',
    handler:function(request,reply){
rubrica.push({
    nome: request.payload.nome,
    professione:request.payload.professione
});
reply(JSON.stringify(rubrica));
console.log(rubrica);
    }
})
server.start(function(err){if(err)throw err; console.log("Running on " +server.info.uri)});
