var ListElementView = (function () {
    function ListElementView(listView, Id, text) {
        if (text === void 0) { text = ""; }
        this.listView = listView;
        this.Id = Id;
        this.text = text;
        this.LiName = listView.Ul + "_li";
        this.LiNameSelector = "." + this.LiName;
        this.LiId = this.LiName + "-" + Id.toString();
        this.LiIdSelector = "#" + this.LiId;
        $(listView.UlSelector).append(this.GetElement(text));
    }
    ListElementView.prototype.GetElement = function (text) {
        return "<li id=\"" + this.LiId + "\" class=\"" + this.LiName + " w3-display-container\">" + text + "</li>";
    };
    return ListElementView;
}());
