var ListView = (function () {
    function ListView(app) {
        this.app = app;
        this.UlName = app + "_ul";
        this.ClassUlName = "." + this.UlName;
        $("." + this.app).append(this.CreateList());
    }
    ListView.prototype.CreateList = function () {
        return "<ul class=\"" + this.UlName + " w3-ul w3-card\"></ul>";
    };
    return ListView;
}());
var ListElementView = (function () {
    function ListElementView(listView, text) {
        if (text === void 0) { text = ""; }
        this.listView = listView;
        this.text = text;
        this.LiName = listView.UlName + "_li";
        this.ClassLiName = "." + this.LiName;
        $(listView.ClassUlName).append(this.CreateElement(text));
    }
    ListElementView.prototype.CreateElement = function (text) {
        return "<li class=\"" + this.LiName + "\">" + text + "</li>";
    };
    return ListElementView;
}());
$("window").ready(function () {
    var view = new ListView("test_list");
});
