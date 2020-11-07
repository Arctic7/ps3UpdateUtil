const https = require('https');
const xmlParser = require('fast-xml-parser');
const fs = require('fs');

function getXml(serial){
    const req = https.request({
        hostname:'a0.ww.np.dl.playstation.net',
        port:443,
        path:`/tpl/np/${serial}/${serial}-ver.xml`,
        method:'GET',
        rejectUnauthorized:false
    },(resp)=>{
        resp.on('data',data=>{
            let respContent = data.toString();
            let respJsonObj = xmlParser.parse(respContent,{
                ignoreAttributes:false,
                attributeNamePrefix:''
            });
            let packages = respJsonObj.titlepatch.tag.package;
            let downloadURLArray = [];
            if(packages instanceof Array){
                packages.forEach(ele=>{
                    downloadURLArray.push(ele.url);
                });

            }else if(packages instanceof Object){
                downloadURLArray.push(packages.url);
            }
            let content = downloadURLArray.join('\r\n');
            fs.writeFile(__dirname+'/downloadurl.txt',content,{flag:'w'},(err)=>{
                if(err){
                    console.log('写入出错：'+err);
                }
            });
        });
    });
    req.on('error',err=>{
        console.log(err);
    });
    req.end();

}


getXml('BCAS25003');
