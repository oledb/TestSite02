class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.LiClass = listView.Ul + "_li";
        this.LiId = this.LiClass + "-" + Id.toString();
        this.selector = {
            liClass: "." + this.LiClass,
            liId: "#" + this.LiId
        };
        this.GetElement(this.Text).appendTo(listView.UlSelector);
    }

    public LiClass: string;
    public LiId: string;
    public element: JQuery;
    public selector: {
        liClass: string,
        liId: string
    }

    private GetElement(text: string): JQuery {
        this.element = $("<li></li>")
            .addClass(this.LiClass)
            .addClass("w3-display-container")
            .text(text);
        this.element.attr("id", this.LiId);
        return this.element;
    }
}