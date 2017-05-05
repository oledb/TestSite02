/// <reference path="./UiDesigner.ts"/>

class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.LiClass = listView.ulName + "_li";
        this.LiId = this.LiClass + "-" + Id.toString();
        this.GetElement(this.Text).appendTo(listView.root);
        this.SetAnimation();
    }

    public LiClass: string;
    public LiId: string;
    public root: JQuery;
    public buttonsContainer: JQuery;
    public textContainer: JQuery;
    public removeButton: JQuery;
    private GetElement(text: string): JQuery {
        this.root = $("<li></li>")
            .addClass(`${this.LiClass} w3-display-container`);
        this.textContainer = $("<span></span>")
            .text(text)
            .appendTo(this.root);
        this.buttonsContainer = $("<div></div>")
            .addClass("w3-display-right")
            .appendTo(this.root);
        this.removeButton = UiDesigner.CreateButton("Remove",
            this.listView.color,
            this.listView.hoverColor,
            "w3-button")
            .appendTo(this.buttonsContainer);
        this.root.attr("id", this.LiId);
        return this.root;
    }

    private SetAnimation(): void {
        this.buttonsContainer.hide();
        $(this.root).on("mouseover", () => {
            $(this.buttonsContainer).show();
        });
        $(this.root).on("mouseout", () => {
            $(this.buttonsContainer).hide();
        });
    }
}