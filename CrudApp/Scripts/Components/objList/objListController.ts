/// <reference path="../../references.ts"/>

class ObjListController {
    constructor(public view: ObjList, public model: IXhrModel) {
        view.onaddNewElement = this.onaddNew;
    }

    private onaddNew = () => {
        let text = this.view.inputText;
        this.view.addElement({ id: 1, name: text });
    }
}