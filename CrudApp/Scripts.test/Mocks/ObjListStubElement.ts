/// <reference path="../../Scripts/references.ts"/>

class ObjListStubElement extends ObjListElement {
    constructor(public objective: IObjective) {
        super(objective);
    }

    public triggerSaveBtn() {
        this.rootEditSaveBtn.trigger("mousedown");
    }
}