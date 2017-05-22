/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.eventAddNewElement = this.onaddNewElement;
        model.Get((result) => {
            for (let elem of result)
                this.setEventsToElement(view.addElement(<IObjective>elem));
        })
    }

    public onaddNewElement = (text: string) => {
        if (this.isValidText(text)) {
            let temp = this.getObjective(text);
            if (temp !== undefined) {
                this.model.Post(temp, (id) => {
                    temp.id = id;
                    this.setEventsToElement(this.view.addElement(temp));
                });
            }
        }
    }

    public onchangeStatus = (obj: IObjective) => {
        return true;
    }

    public ondestroyElement = (obj: IObjective) => {
        this.view.removeElement(obj);
    }

    private setEventsToElement(element: ObjListElement) {
        element.eventChangeStatus = this.onchangeStatus;
        element.eventDestroyElement = this.ondestroyElement;
    }

    public isValidText(text: string): boolean {
        return true;
    }

    public getObjective(text: string): IObjective {
        return { id: 1, name: text };
    }
}