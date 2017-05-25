/// <reference path="../../Scripts/references.ts"/>

class ObjListStubElement extends ObjListElement {
    constructor(public objective: IObjective) {
        super(objective);
    }

    public pressSaveBtn() {
        this.rootEditSaveBtn.trigger("mousedown");
    }

    public triggerEditModeOnAndInputText(text: string) {
        this.rootTableText.trigger("click");
        this.rootEditInput.val(text);
    }

    public pressWipButton() {
        this.rootMenu.wipBtn.trigger("click");
    }

    public pressWaitButton() {
        this.rootMenu.waitBtn.trigger("click");
    }

    public pressCancelButton() {
        this.rootMenu.cancelBtn.trigger("click");
    }

    public pressNewButton() {
        this.rootMenu.newBtn.trigger("click");
    }

    public pressRemoveButton() {
        this.rootMenu.removeBtn.trigger("click");
    }

    public pressIconButton() {
        this.rootTableIcon.trigger("click");
    }
}