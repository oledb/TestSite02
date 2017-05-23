/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.onaddNewElement = this.onaddNew;
        this.model.Get((result) => {
            for (let obj of result)
                view.addElement(<IObjective>obj);
        });
    }

    private onaddNew = () => {
        let text = this.view.inputText;
        let value: IObjective = { name: text };
        this.model.Post(value, (result) => {
            this.view.addElement({ id: result, name: text });
            this.view.clearInput();
        })
        
    }
}