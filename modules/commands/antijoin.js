module.exports.config = {
 name: "antijoin",
 version: "1.0.0",
 credits: "Bareno",
 hasPermssion: 1,
 description: "Cấm thành viên mới vào nhóm",
 usages: "",
 commandCategory: "Quản Lí Box",
 cooldowns: 0
};
module.exports.run = async({ api, event, Threads, Users}) => {
    const axios = require('axios');
    let name = await Users.getNameUser(event.senderID);
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('𝙼𝚞𝚘̂́𝚗 𝚋𝚘𝚝 𝚝𝚑𝚞̛̣𝚌 𝚑𝚒𝚎̣̂𝚗 𝚕𝚎̣̂𝚗𝚑 𝚗𝚊̀𝚢, 𝚟𝚞𝚒 𝚕𝚘̀𝚗𝚐 𝚝𝚑𝚎̂𝚖 𝚋𝚘𝚝 𝚕𝚊̀𝚖 𝚚𝚝𝚟!!!', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
    else data.newMember = false;
    await Threads.setData(event.threadID, { data });
      global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`=== 『 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 』 ===\n▱▱▱▱▱▱▱▱▱▱▱▱▱\nNhận lệnh ${(data.newMember == true) ? "bật" : "tắt"} anti join từ ${name} thành công`, event.threadID, event.messageID);
}