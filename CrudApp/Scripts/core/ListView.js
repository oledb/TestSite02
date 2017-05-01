var ListView = (function () {
    function ListView(App, color, hoverColor) {
        if (color === void 0) { color = ""; }
        if (hoverColor === void 0) { hoverColor = ""; }
        this.App = App;
        this.color = color;
        this.hoverColor = hoverColor;
        this.list = [];
        this.Ul = App + "_ul";
        this.ClassUl = "." + this.Ul;
        this.Input = App + "_input";
        this.ClassInput = "." + this.Input;
        this.InputButton = App + "_inputButton";
        this.ClassInputButton = "." + this.InputButton;
        $("." + this.App).append(this.GetList());
        $(this.ClassUl).append(this.GetInputElement());
    }
    ListView.prototype.GetList = function () {
        return "<ul class=\"" + this.Ul + " w3-ul w3-card " + this.color + "\"></ul>";
    };
    ListView.prototype.GetInputElement = function () {
        return "<li class=\"w3-display-container\">\n            <input class=\"" + this.Input + " " + this.color + " w3-margin-0 w3-input w3-border-0\" \n                placeholder=\"Press Enter to add a task\" \n                type=\"text\" \n                style=\"outline: none; padding: 0px;\"/>\n            <button class=\"" + this.InputButton + " w3-button w3-display-right " + this.color + " " + this.hoverColor + "\">Add</button>\n        </li>";
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
        this.LiName = listView.Ul + "_li";
        this.ClassLiName = "." + this.LiName;
        $(listView.ClassUl).append(this.GetElement(text));
    }
    ListElementView.prototype.GetElement = function (text) {
        return "<li class=\"" + this.LiName + " w3-display-container\">" + text + "</li>";
    };
    return ListElementView;
}());
$("window").ready(function () {
    var view = new ListView("test_list", "w3-orange", "w3-hover-red");
    view.Add("Hello");
    view.Add("World");
});
