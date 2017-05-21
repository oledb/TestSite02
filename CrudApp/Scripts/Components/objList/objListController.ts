/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList) {
        view.eventAddNewElement = this.onaddNewElement;
    }

    private onaddNewElement = (text: string) => {
        if (this.isValidText(text)) {
            let temp = this.getObjective(text);
            if (temp !== undefined)
                this.view.addElement(temp);
        }
    }

    private isValidText(text: string): boolean {
        return true;
    }

    private getObjective(text: string): IObjective {
        return { id: 1, name: text };
    }
}