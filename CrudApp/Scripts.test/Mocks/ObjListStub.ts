/// <reference path="../../Scripts/references.ts"/>

class ObjListStub extends ObjList {
    constructor(
        public idSelector: string,
        public riseError: (text: string) => void = (text) => { throw text; }
    )
    {
        super(idSelector, riseError);
    }

    public pressAddNewButton() {
        this.SaveNewBtn.trigger("mousedown");
    }

    public pressEnterInInputField() {
        let keypress = $.Event("keypress");
        keypress.which = 13;
        this.newElementInput.trigger(keypress);
    }

    public addTextToInputField(text: string) {
        this.newElementInput.text(text);
    }

}