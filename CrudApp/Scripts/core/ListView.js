var _this = this;
var ListView = (function () {
    function ListView(app) {
        this.app = app;
        this.listClass = "ListView";
        this.removeButtonClass = "ListView-RemoveBtn";
        this.completeButtonClass = "ListView-CompleteBtn";
        this.controlButtonsClass = "ListView-Controls";
        this.CreateList();
        this.CreateListElements("hello", 0);
        this.CreateListElements("my world", 1);
    }
    ListView.prototype.CreateList = function () {
        $(this.app).append("<ul class=\"" + this.listClass + " w3-ul w3-card\"></ul>");
    };
    ListView.prototype.CreateListElements = function (text, index, cssClass) {
        if (cssClass === void 0) { cssClass = "w3-teal"; }
        $("." + this.listClass).append("<li class=\"" + cssClass + " w3-display-container\">\n            " + text + " " + this.GetContorlButtons() + "\n        </li>");
    };
    ListView.prototype.GetContorlButtons = function () {
        return "<div class=\"" + this.controlButtonsClass + " w3-display-right\">\n                    <span class=\"" + this.completeButtonClass + " w3-button w3-transparent\">Complete</span>\n                    <span class=\"" + this.removeButtonClass + " w3-button w3-transparent\">Remove</span>\n                </div>";
    };
    return ListView;
}());
$("window").ready(function () {
    var list = new ListView(".test_list");
    $(".tl-ctr").hide();
    $(".tl-li").on("mouseout", function (e) {
        e.stopPropagation();
        $(".tl-ctr").hide();
    });
    $(".tl-li").on("mouseover", function (e) {
        e.stopPropagation();
        $(".tl-ctr", _this).show();
    });
    $(".tl-rm").on("click", function () {
        $(_this).parent();
    });
});
//# sourceMappingURL=ListView.js.map