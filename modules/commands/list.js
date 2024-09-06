module.exports.config = {
  name: "list",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Bareno",
  description: "lặp lại nội dung",
  commandCategory: "Hệ Thống",
  usages: "HDSD: !list + số lần | nội dung",
  cooldowns: 1,
}
module.exports.run = async function ({ api, event, args }) { 
  const { sendMessage: tdung } = api;
  const { threadID, messageID } = event;
  if(args.length == 0) {
    return tdung(`${this.config.usages}`, threadID);
  }
  const kcnd = "tddzs1tg06";
  let [ đếm, message ] = args.join(' ').split('|');
  if (!message) message = kcnd;
  let sltn = parseInt(đếm);
  let ndd = '';
  for(let a = 1; a <= sltn; a++) {
    ndd += a + '. ' + message.trim() + '\n';
  }
  tdung(`${ndd}`, threadID);
}