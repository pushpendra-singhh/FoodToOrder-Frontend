// const http=require('http');
// const port=process.env.PORT || 3000;
// const server=http.createServer((req,res)=>{
//     res.setHeader('content-type','application/json');
//     res.end(JSON.stringify({text:'hi',numbers:[1,2,3]}));
// }
// );
// server.listen(port);
// console.log(`server is listening on port ${port}`);

// const server=http.createServer((req,res)=>{
//     if(req.url==='/'){
//       return respondText(req,res);
//     }
//     if(req.url==='/json'){
//         return respondJson(req,res);
//     }
//     requestnotfound(req,res);
// });
// server.listen(port);
// console.log(`server is listening on port ${port}`);
// function respondText(req,res){
//     res.setHeader('content-type','text/plain');
//     res.end('hi');
// }
// function respondJson(req,res){
//     res.setHeader('content-type','application/json');
//     res.setHeader('Access-Control-Allow-Origin','*');
//     var p={id:1,name:'iphone',price:1000};
//     res.end(JSON.stringify(p));
// }
// function requestnotfound(req,res){
//     res.writeHead(404,{'content-type':'text/plain'});
//     res.end('404 not found');
// }

/* trying using express */
const fs=require('fs');
const path=require('path');
const express=require('express');
const port=process.env.PORT || 3000;
const app=express();
app.get('/restaurants',listrestaurants);
app.get('/orders ',listorders);
app.listen(port,()=>console.log(`server is listening on port ${port}`));
async function listrestaurants(req,res){
    console.log(__dirname+'/dbfiles/data.json');
const restaurantsfile=path.join(__dirname,'/dbfies/data.json');
try{
    const data=await fs.promises.readFile(restaurantsfile,'utf8');
    res.json(JSON.parse(data));
} catch(err){
    res.status(500).json({error:err.message});
}
}
async function listorders(req,res){
    const ordersfile=path.join(__dirname,'/dbfiles/data.json');
    try{
        const data=await fs.readFile(ordersfile,'utf8');
        res.json(JSON.parse(data));
    } catch(err){
        res.status(500).json({error:err.message});
    }
}
