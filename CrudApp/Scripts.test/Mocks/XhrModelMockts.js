var XhrModelMock = (function () {
    function XhrModelMock() {
        var _this = this;
        this.errorIndex = 0;
        this.getIndex = 0;
        this.postText = "no text";
        this.putText = "not text";
        this.error = function (xhr, status, error) { return _this.errorIndex++; };
        this.removeId = -10000;
    }
    XhrModelMock.prototype.Get = function (success) {
        this.getIndex++;
        success([
            { objectiveId: 4, name: "Test 01" },
            { objectiveId: 5, name: "Test 02" }
        ]);
    };
    XhrModelMock.prototype.Post = function (value, success) {
        this.postText = value.name;
        success(0);
    };
    XhrModelMock.prototype.Put = function (value, success) {
        this.putText = value.name;
    };
    XhrModelMock.prototype.Delete = function (id, success) {
        this.removeId = id;
    };
    return XhrModelMock;
}());
