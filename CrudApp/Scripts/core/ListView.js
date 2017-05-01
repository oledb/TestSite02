var ListView = (function () {
    function ListView(App, color) {
        if (color === void 0) { color = ""; }
        this.App = App;
        this.color = color;
        this.list = [];
        this.UlName = App + "_ul";
        this.ClassUlName = "." + this.UlName;
        $("." + this.App).append(this.CreateList());
    }
    ListView.prototype.CreateList = function () {
        return "<ul class=\"" + this.UlName + " w3-ul w3-card " + this.color + "\"></ul>";
    };
    ListView.prototype.Add = function (text) {
        this.list.push(new ListElementView(this, text));
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
        return "<li class=\"" + this.LiName + " w3-display-container\">" + text + "</li>";
    };
    return ListElementView;
}());
$("window").ready(function () {
    var view = new ListView("test_list", "w3-orange");
    view.Add("Hello");
    view.Add("World");
});
