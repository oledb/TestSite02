class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.LiName = listView.Ul + "_li";
        this.LiNameSelector = "." + this.LiName;
        this.LiId = this.LiName + "-" + Id.toString();
        this.LiIdSelector = "#" + this.LiId;
        $(listView.UlSelector).append(this.GetElement(this.Text));
    }
    public LiName: string;
    public LiNameSelector: string;
    public LiId: string;
    public LiIdSelector: string;

    private GetElement(text: string): string {
        return `<li id="${this.LiId}" class="${this.LiName} w3-display-container">${text}</li>`;
    }
}