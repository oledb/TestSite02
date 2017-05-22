/// <reference path="../../references.ts"/>

class ObjList {
    constructor(
        public idSelector: string,
        public riseError: (text: string) => void = (text) => { throw text; }
    ) {
        if (this.idSelector == "")
            this.riseError("idSelector is not define");
        this.createView();
        this.setAnimation();
        this.setEvents();
    }
    // Events
    public eventAddNewElement: (text: string) => void;
    public eventIsValidText: (text: string) => boolean;
    public eventCreate: () => void;

    //Fields
    public elements: ObjListElement[] = [];
    // JQuery
    public root = $(`<ul class="w3-ul w3-white"></ul>`);
    
    private newElement = $(`<li class="ov-element"></li>`);
    public newElementInput = $(`<input class="w3-white ov-input" placeholder="Новая задача" type="text">`);
    private newElementBtns = $(`<div id="buttons" style="display: none;"></div>`);
    public SaveNewBtn = $(`<button class="w3-button w3-red">Сохранить</button>`);
    private CancelNewBtn = $(`<button class="w3-button w3-white w3-margin-left">Отмена</button>`);

    private createView() {
        this.newElement.append(this.newElementInput, this.newElementBtns);
        this.newElementBtns.append(this.SaveNewBtn, this.CancelNewBtn);
        this.root.append(this.newElement);
        $(this.idSelector).append(this.root);
    }

    private saveNewElement() {
        let text = this.newElementInput.val();
        this.eventAddNewElement(text);
        this.newElementInput.val("");
    }

    private setAnimation() {
        this.newElement.on("focusin", () => {
                this.newElementBtns.show();
        });
        this.newElement.on("focusout", () => {
                this.newElementBtns.hide();
        });
    }

    private setEvents() {
        // Add new
        this.SaveNewBtn.on("mousedown", () => {
            this.saveNewElement();
        });
        this.newElementInput.keypress((e) => {
            let key = e.which;
            if (key == 13) { // Enter
                this.saveNewElement();
            }
        });
    }

    public addElement(obj: IObjective) {
        let element = new ObjListElement(obj);
        this.elements.push(element);
        this.root.append(element.root);
    }
}