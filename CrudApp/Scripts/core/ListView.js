var ListView = (function () {
    function ListView(App, color, hoverColor) {
        if (color === void 0) { color = ""; }
        if (hoverColor === void 0) { hoverColor = ""; }
        this.App = App;
        this.color = color;
        this.hoverColor = hoverColor;
        this.Items = [];
        this.tempIndex = 0;
        this.Ul = App + "_ul";
        this.UlSelector = "." + this.Ul;
        this.inputClass = App + "_input";
        this.InputSelector = "." + this.inputClass;
        this.inputButtonClass = App + "_inputButton";
        this.InputButtonSelector = "." + this.inputButtonClass;
        this.createRoot().appendTo("." + this.App);
        this.createLiWithInput().appendTo(this.root);
        console.log(this.liInput);
    }
    ListView.prototype.createRoot = function () {
        this.root = $("<ul></ul>")
            .addClass(this.Ul)
            .addClass("w3-ul w3-card")
            .addClass(this.color);
        return this.root;
    };
    ListView.prototype.createLiWithInput = function () {
        this.liInput = $("<li></li>").addClass("w3-display-container");
        this.input = $("<input></input>")
            .addClass(this.inputClass)
            .addClass(this.color)
            .addClass("w3-margin-0 w3-input w3-border-0")
            .attr("placeholder", "Press Enter to add a task")
            .attr("type", "text")
            .css({ outline: "none", padding: "0px" });
        this.inputAddButton = $("<button></button>")
            .addClass(this.inputButtonClass)
            .addClass(this.color)
            .addClass(this.hoverColor)
            .addClass("w3-button w3-display-right")
            .text("Add");
        return this.liInput.append(this.input).append(this.inputAddButton);
    };
    ListView.prototype.Add = function (id, text) {
        this.Items.push(new ListElementView(this, id, text));
    };
    return ListView;
}());
