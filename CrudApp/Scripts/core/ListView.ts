class ListView {
    constructor(public App: string, private color: string = "", private hoverColor: string ="") {
        this.ulName = App + "_ul";
        this.inputName = App + "_input";
        this.inputButtonName = App + "_inputButton";
        this.createRoot().appendTo("." + this.App);
        this.createLiWithInput().appendTo(this.root);
    }

    public root: JQuery;
    public liInput: JQuery;
    public input: JQuery;
    public inputAddButton: JQuery;
    public Items: Array<ListElementView> = [];

    private createRoot(): JQuery {
        this.root = $("<ul></ul>")
            .addClass(this.ulName)
            .addClass("w3-ul w3-card")
            .addClass(this.color);
        return this.root;
    }

    private createLiWithInput(): JQuery{
        this.liInput = $("<li></li>").addClass("w3-display-container");
        
        this.input = $("<input></input>")
            .addClass(this.inputName)
            .addClass(this.color)
            .addClass("w3-margin-0 w3-input w3-border-0")
            .attr("placeholder", "Press Enter to add a task")
            .attr("type", "text")
            .css({ outline: "none", padding: "0px" });
        this.inputAddButton = $("<button></button>")
            .addClass(this.inputButtonName)
            .addClass(this.color)
            .addClass(this.hoverColor)
            .addClass("w3-button w3-display-right")
            .text("Add");
        return this.liInput.append(this.input).append(this.inputAddButton);
    }

    public ulName: string;
    public inputName: string;
    public inputButtonName: string;

    private tempIndex = 0;
    public Add(id:number, text: string) {
        this.Items.push(new ListElementView(this, id, text));
    }
}