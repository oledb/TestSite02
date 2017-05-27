/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.onaddNewElement = this.onaddNew;
        this.model.Get((result) => {
            for (let obj of result) {
                this.setEventsForElement(view.addElement(<IObjective>obj));
            }
        });
    }

    private onaddNew = () => {
        let text = this.view.inputText;
        if (!this.isTextValid(text)) return;
        let value: IObjective = { name: text, status: ObjectiveStatus.New };
        this.model.Post(value, (result) => {
            value.id = result;
            let element = this.view.addElement(value);
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

    private isTextValid(text: string): boolean {
        return text != undefined && text.trim() != "";
    }
}