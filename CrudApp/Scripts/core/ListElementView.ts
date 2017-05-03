class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.LiClass = listView.Ul + "_li";
        this.LiClassSelector = "." + this.LiClass;
        this.LiId = this.LiClass + "-" + Id.toString();
        this.LiIdSelector = "#" + this.LiId;
        this.GetElement(this.Text).appendTo(listView.UlSelector);
    }
    public LiClass: string;
    public LiClassSelector: string;
    public LiId: string;
    public LiIdSelector: string;
    public element: JQuery;

    private GetElement(text: string): JQuery {
        this.element = $("<li></li>")
            .addClass(this.LiClass)
            .addClass("w3-display-container")
            .text(text);
        this.element.attr("id", this.LiId);
        return this.element;
    }
}