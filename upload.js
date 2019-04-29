const Client = require('ssh2-sftp-client');
const fs = require('fs');
const opn = require('opn');
const path = require('path');
const sftp = new Client();

let rootFiles = 0;
let assetsFiles = 0;

const connection = require(path.join(__dirname,'connection.json'));

// const sendFile = async () => {
//     await fs.readdirSync(path.join(__dirname,'dist','Sarigyugh')).forEach(async file => {
//         rootFiles += 1;
//         if (file !== 'assets'){
//             await sftp.fastPut(path.join(__dirname,'dist','Sarigyugh',file),`/Sarigyugh/${file}`).catch((err) => {
//                 console.log(err, 'catch error');
//             });
//         }
//     });
//     await fs.readdirSync(path.join(__dirname,'dist','Sarigyugh','assets')).forEach(async file => {
//         assetsFiles += 1;
//         if (file !== 'portfolio.pdf' && file !== 'projectspics'){
//             await sftp.fastPut(path.join(__dirname,'dist','Sarigyugh','assets',file),`/Sarigyugh/assets/${file}`).catch((err) => {
//                 console.log(err, 'catch error');
//             });
//         }
//     });
//     return true;
// };

const deleteData = async (data,path) => {
    await data.forEach(async file => {
        if (file.type !== 'd'){
            await sftp.delete(`${path}/${file.name}`).catch((err) => {
                console.log(err, 'catch error');
            });
        }
    });
    return true;
};

sftp.connect(connection).then(() => {
    return sftp.list('/Sarigyugh');
}).then(async (data) => {
    await deleteData(data,'/Sarigyugh');
    return true;
}).then(() => {
    return sftp.list('/Sarigyugh/assets');
}).then(async (data) => {
    await deleteData(data,'/Sarigyugh/assets');
    return true;
})

// .then(async() => {
//     await sendFile();
//     return true;
// }).then(() => {
//     return sftp.list('/Sarigyugh');
// }).then((data) => {
//     sftp.end();
//     // if (data.length === rootFiles){
//         console.log('\x1b[32m%s\x1b[37m%s\x1b[0m','SUCCESS: ', `${rootFiles-1} Updated; ${assetsFiles} asset files`);
//         opn('http://Sarigyughvilas.me');
//     // }else{
//     //     console.log(data);
//     //     console.log('\x1b[31m%s\x1b[37m%s\x1b[0m','ERROR: ','No all data were uploaded');
//     // }
//     return true;
// }).catch((err) => {
//     console.log(err, 'catch error');
//     sftp.end();
// });
