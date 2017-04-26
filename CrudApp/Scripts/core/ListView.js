var ListView = (function () {
    function ListView(app) {
        this.app = app;
        this.list = "ListView_crud";
        this.CreateList();
        this.CreateListElements();
    }
    ListView.prototype.CreateList = function () {
        $(this.app).append('<ul class="' + this.list + '"></ul>');
    };
    ListView.prototype.CreateListElements = function () {
        $("." + this.list).append("<li>Hello</li>");
        $("." + this.list).append("<li>World</li>");
    };
    return ListView;
}());
$("documnet").ready(function () {
    var list = new ListView(".test_list");
});
//# sourceMappingURL=ListView.js.map