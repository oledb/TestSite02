class ListView {
    constructor(public App: string, private color: string = "") {
        this.UlName = App + "_ul";
        this.ClassUlName = "." + this.UlName;
        $(`.${this.App}`).append(this.CreateList());
    }

    public UlName: string;
    public ClassUlName: string;
    private list: Array<ListElementView> = [];
    private CreateList(): string {
        return `<ul class="${this.UlName} w3-ul w3-card ${this.color}"></ul>`
    }

    public Add(text: string) {
        this.list.push(new ListElementView(this, text));
    }
}

class ListElementView {
    constructor(public listView: ListView, public text: string = "") {
        this.LiName = listView.UlName + "_li";
        this.ClassLiName = "." + this.LiName;
        $(listView.ClassUlName).append(this.CreateElement(text));
    }
    public LiName: string;
    public ClassLiName: string;

    private CreateElement(text:string): string {
        return `<li class="${this.LiName} w3-display-container">${text}</li>`;
    }
}

$("window").ready(() => {
    let view = new ListView("test_list", "w3-orange");
    view.Add("Hello");
    view.Add("World");
});