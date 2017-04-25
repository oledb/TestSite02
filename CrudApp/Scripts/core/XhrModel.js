var XhrModel = (function () {
    function XhrModel(Url, error) {
        this.Url = Url;
        this.error = error;
        this.timeout = 5000;
    }
    XhrModel.prototype.Get = function (success) {
        $.ajax({
            type: 'get',
            url: this.Url,
            success: success,
            error: this.error,
            timeout: this.timeout
        });
    };
    XhrModel.prototype.Post = function (value, success) {
        $.ajax({
            type: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: this.Url,
            success: success,
            error: this.error,
            data: JSON.stringify(value),
            dataType: "json",
            timeout: this.timeout
        });
    };
    XhrModel.prototype.Put = function (value, success) {
        $.ajax({
            type: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: this.Url,
            success: success,
            error: this.error,
            data: JSON.stringify(value),
            timeout: this.timeout
        });
    };
    return XhrModel;
}());
$("window").ready(function () {
    var t = new XhrModel("/api/Objective", function (xhr, status, error) {
        console.log("Cannot execute request!!!");
        console.log(xhr);
        console.log(status);
        console.log(error);
    });
    t.Put({ ObjectiveId: 0, Name: "Test task 007" }, function () {
        console.log("Put success");
        t.Get(function (rslt) {
            console.log("get query");
            console.log(rslt);
        });
    });
});
