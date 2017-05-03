var XhrModelMock = (function () {
    function XhrModelMock() {
        var _this = this;
        this.errorIndex = 0;
        this.getIndex = 0;
        this.postIndex = 0;
        this.postText = "no text";
        this.error = function (xhr, status, error) { return _this.errorIndex++; };
    }
    XhrModelMock.prototype.Get = function (success) {
        this.getIndex++;
        success([
            { ObjectiveId: 4, Name: "Test 01" },
            { ObjectiveId: 5, Name: "Test 02" }
        ]);
    };
    XhrModelMock.prototype.Post = function (value, success) {
        this.postIndex++;
        this.postText = value;
    };
    XhrModelMock.prototype.Put = function (value, success) {
    };
    XhrModelMock.prototype.Delete = function (id, success) {
    };
    return XhrModelMock;
}());
