class ListView {
    public readonly listClass = "ListView";
    public readonly addButtonClass = "ListView-AddBtn";
    public readonly removeButtonClass = "ListView-RemoveBtn";
    public readonly completeButtonClass = "ListView-CompleteBtn";
    public readonly controlButtonsClass = "ListView-Controls";
    public readonly newInputClass = "ListView-newInput";
    public readonly textClass = "ListView-text";
    public readonly dataId = "listIndex";

    constructor(protected app: string, private colorClass = "w3-teal", private hoverClass: string = "") {
        this.CreateList();
        this.CreateInput();
    }

    private CreateList() {
        $(this.app).append(`<ul class="${this.listClass} ${this.colorClass} w3-ul w3-card"></ul>`);
    }

    public CreateListElements(text: string, index: number): JQuery | any {
        var temp = $(`<li class="w3-display-container" data-${this.dataId}="${index}">
            <span class="${this.textClass}">${text}</span>
            ${this.GetContorlButtons()}
        </li>`).appendTo("." + this.listClass);
        return temp;
    }

    private GetContorlButtons(): string {
        return `<div class="${this.controlButtonsClass} w3-display-right">
                    ${this.GetButton(this.completeButtonClass, 'Complete')}
                    ${this.GetButton(this.removeButtonClass, 'Remove')}
                </div>`;
    }

    private CreateInput() {
        $("." + this.listClass).append(`<li class="w3-display-container">
            <input class="${this.newInputClass} ${this.colorClass} w3-margin-0 w3-input w3-border-0" type="text"
                   placeholder="Click to add new" style="outline: none; padding: 0px" />
            ${this.GetButton('ListView-AddBtn', 'Add', 'w3-display-right')}
        </li>`);
    }

    private GetButton(name: string = "", text: string, cssClass: string = ""): string {
        return `<button class="${name} w3-button ${cssClass} ${this.colorClass} ${this.hoverClass}">${text}</button>`;
    }
}

class ListController {
    constructor(private view: ListView) {
        this.initAddButton();
    }

    private initAddButton() {
        $("." + this.view.addButtonClass).on("click", () => this.addTextToList());
        $("." + this.view.newInputClass).keypress((e) => {
            let key = e.which;
            if (key == 13) {
                this.addTextToList();
            }
        });
    }
    private index: number = 0;
    private addTextToList() {
        let text :string = $("." + this.view.newInputClass).val().trim();
        if (text != "" && text !== undefined) {
            let newElement = this.view.CreateListElements(text, this.index++);
            this.initRemoveButtons(newElement.find("." + this.view.removeButtonClass));
        }
        $("." + this.view.newInputClass).val("");
    }

    private initRemoveButtons(removeButton: JQuery) {
        removeButton.on("click", (e) => {
            $(e.currentTarget).parent().parent().remove();
        });
    }
}

function myFunction(text: string) {
    $(".fun").text(text);
}


$("window").ready(() => {
    var view = new ListView(".test_list", "w3-orange", "w3-hover-red");
    var controller = new ListController(view);
});