class ListView {
    constructor(public app: string) {
        this.UlName = app + "_ul";
        this.ClassUlName = "." + this.UlName;
        $(`.${this.app}`).append(this.CreateList());
    }

    public UlName: string;
    public ClassUlName: string;

    private CreateList(): string {
        return `<ul class="${this.UlName} w3-ul w3-card"></ul>`
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
        return `<li class="${this.LiName}">${text}</li>`;
    }
}

$("window").ready(() => {
    let view = new ListView("test_list");
});