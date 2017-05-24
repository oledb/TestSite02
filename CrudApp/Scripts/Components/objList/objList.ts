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
    }

    //Fields
    public elements: ObjListElement[] = [];
    public get inputText(): string {
        return this.newElementInput.val();
    }
    // JQuery
    public root = $(`<ul class="w3-ul w3-white"></ul>`);

    private newElement = $(`<li class="ov-element"></li>`);
    protected newElementInput = $(`<input class="w3-white ov-input" placeholder="Новая задача" type="text">`);
    private newElementBtns = $(`<div id="buttons" style="display: none;"></div>`);
    protected SaveNewBtn = $(`<button class="w3-button w3-red">Сохранить</button>`);
    private CancelNewBtn = $(`<button class="w3-button w3-white w3-margin-left">Отмена</button>`);

    private createView() {
        this.newElement.append(this.newElementInput, this.newElementBtns);
        this.newElementBtns.append(this.SaveNewBtn, this.CancelNewBtn);
        this.root.append(this.newElement);
        $(this.idSelector).append(this.root);
    }

    private setAnimation() {
        this.newElement.on("focusin", () => {
            this.newElementBtns.show();
        });
        this.newElement.on("focusout", () => {
            this.newElementBtns.hide();
        });
        this.SaveNewBtn.on("mousedown", () => {
            this.onaddNewElement();
        })
        this.newElementInput.on("keypress", (e) => {
            if (e.which == 13) {
                this.onaddNewElement();
            }
        })
    }

    public addElement(obj: IObjective): ObjListElement{
        let element = new ObjListElement(obj);
        this.elements.push(element);
        this.root.append(element.root);
        return element; 
    }

    public removeElement(obj: IObjective): void {
        let element = this.elements
            .filter(o => o.objective.id == obj.id);
        if (element.length == 0 || element.length > 1)
            throw `Internal error with objective ${obj.id} ${obj.name}`;
        let index = this.elements.indexOf(element[0]);
        //element[0].root.remove();
        this.elements.splice(index, 1);
    }

    public clearInput() {
        this.newElementInput.val("");
    }

    ///Events
    public onaddNewElement: () => void;
}