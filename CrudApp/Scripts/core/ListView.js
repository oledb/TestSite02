var ListView = (function () {
    function ListView(app, colorClass, hoverClass) {
        if (colorClass === void 0) { colorClass = "w3-teal"; }
        if (hoverClass === void 0) { hoverClass = ""; }
        this.app = app;
        this.colorClass = colorClass;
        this.hoverClass = hoverClass;
        this.listClass = "ListView";
        this.addButtonClass = "ListView-AddBtn";
        this.removeButtonClass = "ListView-RemoveBtn";
        this.completeButtonClass = "ListView-CompleteBtn";
        this.controlButtonsClass = "ListView-Controls";
        this.newInputClass = "ListView-newInput";
        this.textClass = "ListView-text";
        this.dataId = "listIndex";
        this.CreateList();
        this.CreateInput();
    }
    ListView.prototype.CreateList = function () {
        $(this.app).append("<ul class=\"" + this.listClass + " " + this.colorClass + " w3-ul w3-card\"></ul>");
    };
    ListView.prototype.CreateListElements = function (text, index) {
        var temp = $("<li class=\"w3-display-container\" data-" + this.dataId + "=\"" + index + "\">\n            <span class=\"" + this.textClass + "\">" + text + "</span>\n            " + this.GetContorlButtons() + "\n        </li>").appendTo("." + this.listClass);
        return temp;
    };
    ListView.prototype.GetContorlButtons = function () {
        return "<div class=\"" + this.controlButtonsClass + " w3-display-right\">\n                    " + this.GetButton(this.completeButtonClass, 'Complete') + "\n                    " + this.GetButton(this.removeButtonClass, 'Remove') + "\n                </div>";
    };
    ListView.prototype.CreateInput = function () {
        $("." + this.listClass).append("<li class=\"w3-display-container\">\n            <input class=\"" + this.newInputClass + " " + this.colorClass + " w3-margin-0 w3-input w3-border-0\" type=\"text\"\n                   placeholder=\"Click to add new\" style=\"outline: none; padding: 0px\" />\n            " + this.GetButton('ListView-AddBtn', 'Add', 'w3-display-right') + "\n        </li>");
    };
    ListView.prototype.GetButton = function (name, text, cssClass) {
        if (name === void 0) { name = ""; }
        if (cssClass === void 0) { cssClass = ""; }
        return "<button class=\"" + name + " w3-button " + cssClass + " " + this.colorClass + " " + this.hoverClass + "\">" + text + "</button>";
    };
    return ListView;
}());
var ListController = (function () {
    function ListController(view) {
        this.view = view;
        this.index = 0;
        this.initAddButton();
    }
    ListController.prototype.initAddButton = function () {
        var _this = this;
        $("." + this.view.addButtonClass).on("click", function () { return _this.addTextToList(); });
        $("." + this.view.newInputClass).keypress(function (e) {
            var key = e.which;
            if (key == 13) {
                _this.addTextToList();
            }
        });
    };
    ListController.prototype.addTextToList = function () {
        var text = $("." + this.view.newInputClass).val().trim();
        if (text != "" && text !== undefined) {
            var newElement = this.view.CreateListElements(text, this.index++);
            this.initRemoveButtons(newElement.find("." + this.view.removeButtonClass));
        }
        $("." + this.view.newInputClass).val("");
    };
    ListController.prototype.initRemoveButtons = function (removeButton) {
        removeButton.on("click", function (e) {
            $(e.currentTarget).parent().parent().remove();
        });
    };
    return ListController;
}());
$("window").ready(function () {
    var view = new ListView(".test_list", "w3-orange", "w3-hover-red");
    var controller = new ListController(view);
});
//# sourceMappingURL=ListView.js.map