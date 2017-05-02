var ListView = (function () {
    function ListView(App, color, hoverColor) {
        if (color === void 0) { color = ""; }
        if (hoverColor === void 0) { hoverColor = ""; }
        this.App = App;
        this.color = color;
        this.hoverColor = hoverColor;
        this.list = [];
        this.tempIndex = 0;
        this.Ul = App + "_ul";
        this.UlSelector = "." + this.Ul;
        this.Input = App + "_input";
        this.InputSelector = "." + this.Input;
        this.InputButton = App + "_inputButton";
        this.InputButtonSelector = "." + this.InputButton;
        $("." + this.App).append(this.GetList());
        $(this.UlSelector).append(this.GetInputElement());
    }
    ListView.prototype.GetList = function () {
        return "<ul class=\"" + this.Ul + " w3-ul w3-card " + this.color + "\"></ul>";
    };
    ListView.prototype.GetInputElement = function () {
        return "<li class=\"w3-display-container\">\n            <input class=\"" + this.Input + " " + this.color + " w3-margin-0 w3-input w3-border-0\" \n                placeholder=\"Press Enter to add a task\" \n                type=\"text\" \n                style=\"outline: none; padding: 0px;\"/>\n            <button class=\"" + this.InputButton + " w3-button w3-display-right " + this.color + " " + this.hoverColor + "\">Add</button>\n        </li>";
    };
    ListView.prototype.Add = function (id, text) {
        this.list.push(new ListElementView(this, id, text));
    };
    return ListView;
}());
