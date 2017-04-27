/// <reference path="../jquerydef/index.d.ts"/>

class ListView {
    public readonly listClass = "ListView";
    public readonly removeButtonClass = "ListView-RemoveBtn";
    public readonly completeButtonClass = "ListView-CompleteBtn";
    public readonly controlButtonsClass = "ListView-Controls";
    constructor(protected app: string) {
        this.CreateList();
    }
    private CreateList() {
        $(this.app).append(`<ul class="${this.listClass} w3-ul w3-card"></ul>`);
    }
    public CreateListElements(text: string, index: number, cssClass: string = "w3-teal") {
        $("." + this.listClass).append(`<li class="${cssClass} w3-display-container">
            ${text} ${this.GetContorlButtons()}
        </li>`);
    }

    private GetContorlButtons(): string{
        return `<div class="${this.controlButtonsClass} w3-display-right">
                    <span class="${this.completeButtonClass} w3-button w3-transparent">Complete</span>
                    <span class="${this.removeButtonClass} w3-button w3-transparent">Remove</span>
                </div>`;
    }
}

$("window").ready(() => {
    var list = new ListView(".test_list");
    list.CreateListElements("Hello", 0);
    list.CreateListElements("My beutiful world");
    $(".tl-ctr").hide();

    $(".tl-li").on("mouseout", (e) => {
        e.stopPropagation();
        $(".tl-ctr").hide();
    });
    $(".tl-li").on("mouseover", (e) => {
        e.stopPropagation();
        $(".tl-ctr", this).show();
    });
    $(".tl-rm").on("click", () => {
        $(this).parent()
    });
});