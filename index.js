const http= require('http');
const app= require('./express');

const PORT= 3000;

const server= http.createServer(app);


server.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`); 
})