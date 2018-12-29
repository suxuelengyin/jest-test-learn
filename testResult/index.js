var http = require("http");
var url = require("url");
var path = require("path");
var server = new http.Server();
var fs = require('fs')
var {exec}=require('child_process')
var deal=require('./result')
function test(result) {
    console.log(result.testResults[0].testResults);
    server.on('request', function (req, res) {
        console.log(req.method);
        var urlObj = url.parse(req.url);
        var urlPathname = urlObj.pathname;
        
        if (urlPathname === "/") {
            console.log(urlPathname);
            var urlPathname = urlObj.pathname;
            var filePathname = path.join(__dirname, './result.html', urlPathname)
            fs.readFile(filePathname, (err, data) => { //读取文件响应
                if (err) {
                    res.writeHead(404, {
                        "Context-type": "text/plain"
                    });
                    res.write('404');
                    res.end();
                } else {
                    res.writeHead(200, {
                        "Context-type": "text/plain"
                    });
                    res.write(data); //返回数据
                    res.end();
                }
            })
        } else {
            res.writeHead(200, { 'Content-Type': 'aplication/json' })
            res.end(JSON.stringify(deal(result)))
            // server.close()
            console.log('byr');
            
        }
    })
    server.listen(4000, function () {
        console.log("运行在：http://localhost:4000");
        exec('start http://localhost:4000');

    })
    return result
}
module.exports = test