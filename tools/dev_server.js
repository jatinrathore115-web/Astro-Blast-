const http=require('http'),fs=require('fs'),path=require('path');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.gif':'image/gif','.json':'application/json'};
http.createServer((req,res)=>{const rel=req.url==='/'?'index.html':decodeURIComponent(req.url.slice(1)),file=path.join(process.cwd(),rel);fs.readFile(file,(err,data)=>{if(err){res.statusCode=404;return res.end('Not found')}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data)})}).listen(8000,'127.0.0.1');
