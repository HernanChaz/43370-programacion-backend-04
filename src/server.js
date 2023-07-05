import express from 'express';
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use(errorHandler);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+'/views');

app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const httpServer = app.listen(8080, ()=>{
    console.log('Server ok on port 8080');
})

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) =>{
    console.log('Nueva conexión', socket.id);
})