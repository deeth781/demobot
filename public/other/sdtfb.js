exports.name = '/sdtfb';
exports.index = async(req, res, next) => {
    const axios = require("axios")
    var profileUrl = req.query.link;

    function isUrlValid(link) {
        var res = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null)
            return !1;
        else return !0
    };
    if (!profileUrl) return res.jsonp({ error: "Thiếu dữ liệu" })
    if (!isUrlValid(profileUrl)) return res.jsonp({ error: "Vui lòng nhập link facebook hợp lệ !" })
    const response = await axios.get("https://marketingtool.top/wp-admin/admin-ajax.php?action=ajax_convert_to_phone&link=" + encodeURIComponent(profileUrl) + "&security=d27499e528", {
        headers: {
            Cookie: "Thay cookie vô"
        }
    });
    const result = response.data.replace(/<[^>]*>/g, "");
    if (result == 'Chưa có dữ liệu này, vui lòng nhập thông tin khác!') return res.jsonp({ error: "không tìm thấy sdt của liên kết này!" })
    const sdt = result.substr(8, result.indexOf(' F') - 8)
    const link = result.substr(result.indexOf('F') + 10)
    res.json({
        data: {
            sdt,
            link
        },
        author: 'TuanDz'
    })
}