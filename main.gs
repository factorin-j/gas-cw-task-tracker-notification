var TOKEN = ''; // set chatwork api token
var TASK_LIST_SHEET = 'TASKS LIST';
var ACCOUNTS_SHEET = 'ACCOUNTS';
var ROOM_ID = 0; //set chatwork room id
var COLUMN_E = 5;

function onAssignTask(e) {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(TASK_LIST_SHEET);
    var cell = sheet.getActiveCell();

    // check for column E
    if (cell.getColumn() != COLUMN_E) {
        return;
    }

    //check for assignee name
    var name = cell.getValue();
    if (name == '') {
        return;
    }

    // check if developer name exists
    var dev = User.getByName(name);
    if (dev == null) {
        return;
    }

    var email = Session.getActiveUser().getEmail();
    var author = User.getByEmail(email);
    var task = Task.getByRow(cell.getRow());

    var message = '[To:' + dev.cid + '] ' + dev.name + 'さん[title]Task Tracker #' + task.id
        + ' has been assigned to you by [picon:' + author.cid + '] ' + author.name + 'さん[/title]'
        + '[code]\n'
        + ' ■ ID       : #' + task.id + '\n'
        + ' ■ Target   : ' + task.target + '\n'
        + ' ■ Status   : ' + task.status + '\n'
        + ' ■ Type     : ' + task.type + '\n'
        + ' ■ Priority : ' + task.priority + '\n';

    var reviewer = User.getByName(task.reviewer);
    if (reviewer != null) {
        message += ' ■ Reviewer : ' + reviewer.name + 'さん\n';
    }

    message += '\n[/code][info]' + task.detail + '[/info]\n' + spreadsheet.getUrl();

    var chatwork = new ChatWork(TOKEN);
    chatwork.send(ROOM_ID, message);
}
