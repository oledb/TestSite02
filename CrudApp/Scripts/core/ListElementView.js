var ListElementView = (function () {
    function ListElementView(listView, Id, Text) {
        if (Text === void 0) { Text = ""; }
        this.listView = listView;
        this.Id = Id;
        this.Text = Text;
        this.LiClass = listView.Ul + "_li";
        this.LiId = this.LiClass + "-" + Id.toString();
        this.selector = {
            liClass: "." + this.LiClass,
            liId: "#" + this.LiId
        };
        this.GetElement(this.Text).appendTo(listView.UlSelector);
    }
    ListElementView.prototype.GetElement = function (text) {
        this.root = $("<li></li>")
            .addClass(this.LiClass + " w3-display-container")
            .text(text);
        this.root.attr("id", this.LiId);
        return this.root;
    };
    return ListElementView;
}());
