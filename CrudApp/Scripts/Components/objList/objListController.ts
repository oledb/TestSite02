/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.onaddNewElement = this.onaddNew;
        this.model.Get((result) => {
            for (let obj of result) {
                console.log(obj);
                this.setEventsForElement(view.addElement(<IObjective>obj));
            }
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
        element.onremove = this.removeElement;
        element.oncomplete = this.completeElement;
    }

    private updateElement = (sender: ObjListElement, obj: IObjective) => {
        console.log("send update")
        console.log(obj);
        this.model.Put(obj, (result) => {
            
            sender.update(obj);
        }) 
    }

    private removeElement = (sender: ObjListElement, obj: IObjective) => {
        this.model.Delete(obj.id, (result) => {
            this.view.removeElement(obj);
            sender.destroy();
        });
    }

    private completeElement = (sender: ObjListElement, obj: IObjective) => {
        this.model.Put(obj, (result) => {
            this.view.removeElement(obj);
            sender.complete();
        }); 
    }
}