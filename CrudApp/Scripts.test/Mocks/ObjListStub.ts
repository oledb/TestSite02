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
        let element = this.getElement();
        if (element.eventDestroyElement === undefined)
            throw "eventDestroyElement of first element is undefined";
        element.objective.status = ObjectiveStatus.Completed;
        element.eventUpdate(element.objective);
        element.eventDestroyElement(element.objective);
    }

    public triggerEventUpdateTextElement(text: string): void {
        let element = this.getElement();
        element.objective.name = text;
        element.eventUpdate(element.objective);
    }

    private getElement(): ObjListElement {
        if (this.elements.length == 0)
            throw "View.elements is empty. Can't raise the event";
        if (this.elements[0].eventUpdate === undefined)
            throw "eventChangeStatus of first element is undefined";
        return this.elements[0];
    }
}