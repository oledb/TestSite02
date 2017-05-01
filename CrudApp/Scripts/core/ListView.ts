class ListView {
    constructor(public App: string, private color: string = "", private hoverColor: string ="") {
        this.Ul = App + "_ul";
        this.ClassUl = "." + this.Ul;
        this.Input = App + "_input";
        this.ClassInput = "." + this.Input;
        this.InputButton = App + "_inputButton";
        this.ClassInputButton = "." + this.InputButton;
        $(`.${this.App}`).append(this.GetList());
        $(this.ClassUl).append(this.GetInputElement());
    }

    private list: Array<ListElementView> = [];

    private GetList(): string {
        return `<ul class="${this.Ul} w3-ul w3-card ${this.color}"></ul>`
    }

    private GetInputElement(): string{
        return `<li class="w3-display-container">
            <input class="${this.Input} ${this.color} w3-margin-0 w3-input w3-border-0" 
                placeholder="Press Enter to add a task" 
                type="text" 
                style="outline: none; padding: 0px;"/>
            <button class="${this.InputButton} w3-button w3-display-right ${this.color} ${this.hoverColor}">Add</button>
        </li>`
    }

    public Ul: string;
    public ClassUl: string;
    public Input: string;
    public ClassInput: string;
    public InputButton: string;
    public ClassInputButton: string;

    public Add(text: string) {
        this.list.push(new ListElementView(this, text));
    }
}

class ListElementView {
    constructor(public listView: ListView, public text: string = "") {
        this.LiName = listView.Ul + "_li";
        this.ClassLiName = "." + this.LiName;
        $(listView.ClassUl).append(this.GetElement(text));
    }
    public LiName: string;
    public ClassLiName: string;

    private GetElement(text:string): string {
        return `<li class="${this.LiName} w3-display-container">${text}</li>`;
    }
}

$("window").ready(() => {
    let view = new ListView("test_list", "w3-orange", "w3-hover-red");
    view.Add("Hello");
    view.Add("World");
});