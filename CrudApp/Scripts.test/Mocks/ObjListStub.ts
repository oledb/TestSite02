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
        this.newElementInput.val(text);
    }

    public addStubElement(text: string): ObjListStubElement {
        this.addTextToInputField(text);
        this.pressAddNewButton();
        let stub = new ObjListStubElement(this.elements[0].objective);
        if (this.elements[0].onupdate !== undefined)
            stub.onupdate = this.elements[0].onupdate;
        if (this.elements[0].onremove !== undefined)
            stub.onremove = this.elements[0].onremove;
        return stub;
    }
}