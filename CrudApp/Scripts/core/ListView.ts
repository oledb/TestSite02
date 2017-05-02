class ListView {
    constructor(public App: string, private color: string = "", private hoverColor: string ="") {
        this.Ul = App + "_ul";
        this.UlSelector = "." + this.Ul;
        this.Input = App + "_input";
        this.InputSelector = "." + this.Input;
        this.InputButton = App + "_inputButton";
        this.InputButtonSelector = "." + this.InputButton;
        $(`.${this.App}`).append(this.GetList());
        $(this.UlSelector).append(this.GetInputElement());
    }

    public Items: Array<ListElementView> = [];

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
    public UlSelector: string;
    public Input: string;
    public InputSelector: string;
    public InputButton: string;
    public InputButtonSelector: string;

    private tempIndex = 0;
    public Add(id:number, text: string) {
        this.Items.push(new ListElementView(this, id, text));
    }
}