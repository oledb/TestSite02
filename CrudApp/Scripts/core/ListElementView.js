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
        $(listView.UlSelector).append(this.GetElement(this.Text));
    }
    ListElementView.prototype.GetElement = function (text) {
        return "<li id=\"" + this.LiId + "\" class=\"" + this.LiClass + " w3-display-container\">" + text + "</li>";
    };
    return ListElementView;
}());
