/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.eventAddNewElement = this.onaddNewElement;
        model.Get((result) => {
            for (let elem of result)
                this.setEventsToElement(view.addElement(<IObjective>elem));
        })
    }

    /// View events
    public onaddNewElement = (text: string) => {
        if (this.isValidText(text)) {
            let temp = this.getNewObjective(text);
            if (temp !== undefined) {
                this.model.Post(temp, (id) => {
                    temp.id = id;
                    this.setEventsToElement(this.view.addElement(temp));
                });
            }
        }
    }

    private isValidText(text: string): boolean {
        return true;
    }

    /// View Elements event
    public onupdateElement = (obj: IObjective) => {
        var res = false;
        this.model.Put(obj, () => { res = true; console.log("res is " + res) });
        console.log("after res is " + res);
        return res;
    }

    public ondestroyElement = (obj: IObjective) => {
        this.view.removeElement(obj);
    }

    private setEventsToElement(element: ObjListElement) {
        
        element.eventUpdate = this.onupdateElement;
        element.eventDestroyElement = this.ondestroyElement;
    }

    private getNewObjective(text: string): IObjective {
        return { id: 1, name: text };
    }
}