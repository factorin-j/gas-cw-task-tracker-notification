var User = (function() {
    var extract = function(expected, index) {
        var data = User.retrieveAll();
        for (var x = 0; x < data.length; x++) {
            if (data[x][index] == expected) {
                return {
                    name: data[x][0],
                    cid: data[x][1],
                    email: data[x][2]
                };
            }
        }

        return null;
    };

    return {
        retrieveAll: function () {
            var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCOUNTS_SHEET);
            return sheet.getDataRange().getValues();
        },
        getByEmail: function (email) {
            return extract(email, 2);
        },
        getByName: function (name) {
            return extract(name, 0);
        }
    }
})();
