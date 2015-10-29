function ChatWork(token) {
    this.send = function (room_id, message) {
        var context = {
            headers: {"X-ChatWorkToken": token},
            method: "post",
            payload : {body : message}
        };

        var url = "https://api.chatwork.com/v1/rooms/" + room_id + "/messages";
        UrlFetchApp.fetch(url, context);
    }
}
