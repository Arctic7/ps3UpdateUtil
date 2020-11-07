const https = require('https');

function getXml(){
    const req = https.request({
        hostname:'a0.ww.np.dl.playstation.net',
        port:443,
        path:'/tpl/np/BCAS25003/BCAS25003-ver.xml',
        method:'GET',
        rejectUnauthorized:false
    },(resp)=>{
        resp.on('data',data=>{
            console.log(data.toString());
        });
    });
    req.on('error',err=>{
        console.log(err);
    });
    req.end();

}


getXml();