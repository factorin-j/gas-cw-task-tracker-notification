var Task = {
    getByRow: function (row) {
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TASK_LIST_SHEET);
        var task = sheet.getRange(row + ':' + row).getValues()[0];
        return {
            id: task[0],
            target: task[2],
            detail: task[3],
            assignee: task[4],
            status: task[5],
            type: task[6],
            priority: task[7]
        }
    }
};
