/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.onaddNewElement = this.onaddNew;
        this.model.Get((result) => {
            for (let obj of result)
                this.setEventsForElement(view.addElement(<IObjective>obj));
        });
    }

    private onaddNew = () => {
        let text = this.view.inputText;
        let value: IObjective = { name: text };
        this.model.Post(value, (result) => {
            let element = this.view.addElement(
                { id: result, name: text, status: ObjectiveStatus.New });
            this.setEventsForElement(element);
            this.view.clearInput();
        })
    }

    private setEventsForElement(element: ObjListElement) {
        element.onupdate = this.updateElement;
    }

    private updateElement = (sender: ObjListElement, obj: IObjective) => {
        this.model.Put(obj, (result) => {
            sender.update(obj);
        }) 
    };
}