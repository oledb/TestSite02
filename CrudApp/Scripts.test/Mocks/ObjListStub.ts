/// <reference path="../../Scripts/references.ts"/>

class ObjListStub extends ObjList {
    constructor(
        public idSelector: string,
        public riseError: (text: string) => void = (text) => { throw text; }
    )
    {
        super(idSelector, riseError);
    }

    public triggerEventAddNewElement(text: string): void {
        this.eventAddNewElement(text);
    }

    public triggerEvenetCompleteElement(): void {
        if (this.elements.length == 0)
            throw "View.elements is empty. Can't raise the event";
        if (this.elements[0].eventChangeStatus === undefined)
            throw "eventChangeStatus of first element is undefined";
        if (this.elements[0].eventDestroyElement === undefined)
            throw "eventDestroyElement of first element is undefined";
        let temp = this.elements[0].objective;
        temp.status = ObjectiveStatus.Completed;
        this.elements[0].eventChangeStatus(temp);
        this.elements[0].eventDestroyElement(temp);
    }
}