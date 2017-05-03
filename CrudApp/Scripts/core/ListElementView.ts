class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.LiClass = listView.ulName + "_li";
        this.LiId = this.LiClass + "-" + Id.toString();
        this.selector = {
            liClass: "." + this.LiClass,
            liId: "#" + this.LiId
        };
        this.GetElement(this.Text).appendTo(listView.root);
    }

    public LiClass: string;
    public LiId: string;
    public root: JQuery;
    public selector: {
        liClass: string,
        liId: string
    }

    private GetElement(text: string): JQuery {
        this.root = $("<li></li>")
            .addClass(`${this.LiClass} w3-display-container`)
            .text(text);
        this.root.attr("id", this.LiId);
        return this.root;
    }
}