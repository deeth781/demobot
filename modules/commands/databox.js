module.exports.config = {
    name: "setdatabox",
    version: "1.0",
    hasPermssion: 3,
    credits: "Bareno",
    description: "Set dữ liệu mới của các box vào data",
    commandCategory: "Hệ Thống",
    usages: "",
    cooldowns: 5,
    
};
module.exports.run = async function ({ event, args, api, Threads }) { 
const { threadID, logMessageData } = event;
const { setData, getData } = Threads;
var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
  const lengthGroup = list.length
  for (var groupInfo of list) {
    console.log(`THREAD-ID: ${groupInfo.threadID}`)
    var threadInfo = await api.getThreadInfo(groupInfo.threadID);
    threadInfo.threadName;
    await Threads.setData(groupInfo.threadID, { threadInfo });
  }
    console.log(`Đã cập nhật dữ liệu của ${lengthGroup} box`)
    return api.sendMessage(`Đã cập nhật dữ liệu của ${lengthGroup} box`, threadID)
}