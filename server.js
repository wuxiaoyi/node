var http = require("http"),  
    url  = require("url"),  
    path = require("path"),  
    fs   = require("fs");  
http.createServer(function (req, res) {  
    var pathname=__dirname+url.parse(req.url).pathname;  
    if (path.extname(pathname)=="") {  
        pathname+="/";  
    }  
    if (pathname.charAt(pathname.length-1)=="/"){  
        pathname+="Jx.html";    //Ĭ��ҳJx.html  
    }  
    path.exists(pathname,function(exists){  
        if(exists){  
            switch(path.extname(pathname)){  
                case ".html":  
                    res.writeHead(200, {"Content-Type": "text/html"});  
                    break;  
                case ".js":  
                    res.writeHead(200, {"Content-Type": "text/javascript"});  
                    break;  
                case ".css":  
                    res.writeHead(200, {"Content-Type": "text/css"});  
                    break;  
                case ".gif":  
                    res.writeHead(200, {"Content-Type": "image/gif"});  
                    break;  
                case ".jpg":  
                    res.writeHead(200, {"Content-Type": "image/jpeg"});  
                    break;  
                case ".png":  
                    res.writeHead(200, {"Content-Type": "image/png"});  
                    break;  
                default:  
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});  
            }  
            fs.readFile(pathname,function (err,data){  
                res.end(data);  
            });  
        } else {  
            res.writeHead(404, {"Content-Type": "text/html"});  
            res.end("<h1>404 Not Found</h1>");  
        }  
    });  
}).listen(3000, "127.0.0.1");   //�������˿ں�  
console.log("Server running at http://123.120.250.98:3000/");
//githubgithubgithubgithub