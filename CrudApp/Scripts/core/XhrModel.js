var XhrModel = (function () {
    function XhrModel(Url) {
        this.Url = Url;
    }
    XhrModel.prototype.Get = function (success) {
        $.ajax({
            url: this.Url,
            success: success
        });
    };
    return XhrModel;
}());
$("window").ready(function () {
    var t = new XhrModel("/api/Objective");
    console.log("start xhr");
    t.Get(function (rslt) {
        console.log("output");
        console.log(rslt);
    });
    console.log("end xhr");
});
//# sourceMappingURL=XhrModel.js.map