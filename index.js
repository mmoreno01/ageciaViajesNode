import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config'



const app = express();

//conetar a ala base de datos
db.authenticate()
    .then( () => console.log('base de datos conectada'))
    .catch( error => console.log(error));
    
//Definir puerto
const port = process.env.PORT || 4000;

//habilitar pug
app.set('view engine', 'pug');

//obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de viajes";
    return next();
});

//Agregar body parsr para leer datos del formulario
app.use(express.static('public'));


//definir la carpeta publica
app.use(express.urlencoded({extended: true}));

//agregar router
app.use('/', router);



app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
