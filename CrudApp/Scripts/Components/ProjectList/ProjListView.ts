/// <reference path="../../references.ts"/>

class ProjListView {
    constructor(public selector: string,
        public riseError: (text: string) => void = (text) => { throw text; }) {
        if (this.selector == "")
            this.riseError("idSelector is not define");
        this.createView();
        this.setAnimation();
    }
    public addElement(value: IProject) {
        let temp = new ProjListElement(value);
        this.elements.push(temp);
    }

    public elements: ProjListElement[] = [];

    // JQuery
    public root = $(`<ul class="w3-ul w3-white"></ul>`);

    private newElement = $(`<li class="ov-element"></li>`);
    protected newElementInput = $(`<input class="w3-white ov-input" placeholder="Новая задача" type="text">`);
    private newElementBtns = $(`<div id="buttons" style="display: none;"></div>`);
    protected SaveNewBtn = $(`<button class="w3-button w3-red">Сохранить</button>`);
    private CancelNewBtn = $(`<button class="w3-button w3-white w3-margin-left">Отмена</button>`);

    private createView() {

    }

    private setAnimation() {

    }
}