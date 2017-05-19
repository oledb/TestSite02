/// <reference path="../../references.ts"/>

class ObjList {
    constructor(
        public idSelector: string,
        public riseError: (text: string) => void
    ) {
        this.createView();
        this.setAnimation();
    }

    // JQuery
    public root = $(`<ul class="w3-ul w3-white"></ul>`);
    
    private firstLi = $(`<li class="ov-element"></li>`);
    public inputNew = $(`<input class="w3-white ov-input" placeholder="Новая задача" type="text">`);
    private firstLiBtns = $(`<div id="buttons" style="display: none;"></div>`);
    private firstLiSave = $(`<button class="w3-button w3-red">Сохранить</button>`);
    private firstLiCancel = $(`<button class="w3-button w3-red">Отмена</button>`);

    public addNewObj: (obj: IObjective) => boolean;

    private createView() {
        console.log("v.001");
        this.firstLi.append(this.inputNew, this.firstLiBtns);
        this.firstLiBtns.append(this.firstLiSave, this.firstLiCancel);
        this.root.append(this.firstLi);

        $(this.idSelector).append(this.root);
    }

    private setAnimation() {
        
    }

    public addElement(obj: IObjective) {
        let element = new ObjListElement(obj);
        this.root.append(element.root);
    }
}