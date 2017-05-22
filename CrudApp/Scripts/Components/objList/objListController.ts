/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.eventAddNewElement = this.onaddNewElement;
        model.Get((result) => {
            for (let elem of result)
                view.addElement(<IObjective>elem);
        })
    }

    public onaddNewElement = (text: string) => {
        if (this.isValidText(text)) {
            let temp = this.getObjective(text);
            if (temp !== undefined)
                this.view.addElement(temp);
        }
    }

    public isValidText(text: string): boolean {
        return true;
    }

    public getObjective(text: string): IObjective {
        return { id: 1, name: text };
    }
}