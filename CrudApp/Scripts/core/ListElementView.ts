class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.LiClass = listView.Ul + "_li";
        this.LiClassSelector = "." + this.LiClass;
        this.LiId = this.LiClass + "-" + Id.toString();
        this.LiIdSelector = "#" + this.LiId;
        $(listView.UlSelector).append(this.GetElement(this.Text));
    }
    public LiClass: string;
    public LiClassSelector: string;
    public LiId: string;
    public LiIdSelector: string;

    private GetElement(text: string): string {
        return `<li id="${this.LiId}" class="${this.LiClass} w3-display-container">${text}</li>`;
    }
}