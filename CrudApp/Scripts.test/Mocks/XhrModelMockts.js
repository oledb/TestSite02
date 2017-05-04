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
            { objectiveId: 4, name: "Test 01" },
            { objectiveId: 5, name: "Test 02" }
        ]);
    };
    XhrModelMock.prototype.Post = function (value, success) {
        this.postIndex++;
        this.postText = value.name;
        success(this.postIndex);
    };
    XhrModelMock.prototype.Put = function (value, success) {
    };
    XhrModelMock.prototype.Delete = function (id, success) {
    };
    return XhrModelMock;
}());
