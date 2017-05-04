class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.LiClass = listView.ulName + "_li";
        this.LiId = this.LiClass + "-" + Id.toString();
        this.GetElement(this.Text).appendTo(listView.root);
    }

    public LiClass: string;
    public LiId: string;
    public root: JQuery;
    public buttonsGroup: JQuery;
    public textContainer: JQuery;
    public removeButton: JQuery;
    private GetElement(text: string): JQuery {
        this.root = $("<li></li>")
            .addClass(`${this.LiClass} w3-display-container`);
        this.textContainer = $("<span></span>")
            .text(text)
            .appendTo(this.root);
        this.buttonsGroup = $("<div></div>")
            .addClass("w3-display-right")
            .appendTo(this.root);
        this.removeButton = $("<button></button>")
            .addClass(this.listView.color)
            .addClass(this.listView.hoverColor)
            .text("Remove")
            .appendTo(this.buttonsGroup);
        this.root.attr("id", this.LiId);
        return this.root;
    }
}