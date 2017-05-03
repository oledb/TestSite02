var ListElementView = (function () {
    function ListElementView(listView, Id, Text) {
        if (Text === void 0) { Text = ""; }
        this.listView = listView;
        this.Id = Id;
        this.Text = Text;
        this.LiClass = listView.Ul + "_li";
        this.LiClassSelector = "." + this.LiClass;
        this.LiId = this.LiClass + "-" + Id.toString();
        this.LiIdSelector = "#" + this.LiId;
        this.GetElement(this.Text).appendTo(listView.UlSelector);
    }
    ListElementView.prototype.GetElement = function (text) {
        this.element = $("<li></li>")
            .addClass(this.LiClass)
            .addClass("w3-display-container")
            .text(text);
        this.element.attr("id", this.LiId);
        return this.element;
    };
    return ListElementView;
}());
