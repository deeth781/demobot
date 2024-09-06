'use strict';
var starttime = new Date().getTime();
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const helmet = require("helmet");
const server = require("./server.js");
const app = express();
const rateLimit = require("express-rate-limit");
const getIP = require('ipware')().get_ip;
const checkIPBlocked = require('./blockIp.js');
const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const path = require('path');
const chalk = require('chalkercli');
const chalk1 = require('chalk');
const CFonts = require('cfonts');
const port = process.env.PORT || 2020;
const moment = require("moment-timezone");
var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
const blockedIPs = JSON.parse(fs.readFileSync('./blockedIP.json', { encoding: 'utf-8' }));
const handleBlockIP = rateLimit({
    windowMs: 60 * 1000,
    max: 650,
    handler: function (req, res, next) {
        const ipInfo = getIP(req);
        const ip = ipInfo.clientIp;
        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            fs.writeFileSync('./blockedIP.json', JSON.stringify(blockedIPs, null, 2));
            console.log(`[ RATE LIMIT ] → Đã block IP: ${ip}`);
        }
        next();
    }
});
app.use(handleBlockIP);
app.use(checkIPBlocked);
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    var color = ["\x1b[31m", "\x1b[32m", "\x1b[33m", '\x1b[34m', '\x1b[35m', '\x1b[36m', '\x1b[37m', "\x1b[38;5;205m", "\x1b[38;5;51m", "\x1b[38;5;197m", "\x1b[38;5;120m", "\x1b[38;5;208m", "\x1b[38;5;220m", "\x1b[38;5;251m"];
    var more = color[Math.floor(Math.random() * color.length)];
    console.log(more + '[ IP ] → ' + ipInfo.clientIp + ' - Đã yêu cầu tới folder:' + decodeURIComponent(req.url));
    next();
});
app.post('/')
app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
    res.status(error.status).json({ message: error.message });
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});


app.listen(port);
console.log('𝑀𝑎́𝑦 𝑐ℎ𝑢̉ 𝑏𝑎̆́𝑡 đ𝑎̂̀𝑢 𝑡𝑎̣𝑖 http://localhost:' + port,"𝑉𝑎̀𝑜 𝑙𝑢́𝑐:" + gio,"\n\n");
async function bank() {
const { writeFileSync } = require('fs-extra');
const { join } = require('path');
const pathData = join(__dirname,"API", "public", "bank", "data", "bank.json");
const user = require('./public/bank/data/bank.json');
    if(user[0] == undefined ) return
    while(true) {
      for (let id of user) {
        var userData = user.find(i => i.senderID == id.senderID);
        var money = userData.data.money;
        userData.data.money = parseInt(money) + parseInt(money) * 0.005
        writeFileSync(pathData, JSON.stringify(user, null, 2));
      }
      console.log("\x1b[38;5;220m[ BANKING ] \x1b[33m→ \x1b[35mĐang trong quá trình xử lí banking ...");
      await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000))
    }
}
bank()

function startBot(message) {
    (message) ? logger(message, "BOT STARTING") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

   child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("BOT RESTARTING!!!");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Bot has been activated please wait a moment!!!");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ Starting ]");
    });
};
axios.get("https://raw.githubusercontent.com/tandung1/Bot12/main/package.json").then((res) => {})
setTimeout(async function () {
console.log(`┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n`)
CFonts.say(`Bot Messenger Created By Vtuan`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
    })
console.log(`\n┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`)
  startBot()
}, 70)
