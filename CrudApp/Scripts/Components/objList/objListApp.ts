/// <reference path="../../references.ts"/>

class ObjListApp {
    constructor(public selector: string, public notify?: NotificationView) {
        this.view = new ObjList(this.selector);
        let err: (xhr, status, error) => void;
        if (notify === undefined)
            err = (xhr, status, error) => { console.log(error); };
        else
            err = (xhr, status, error) => { notify.ShowError(error); };
        this.model = new XhrModel("", err);
        this.controller = new ObjListController(this.view, this.model);
    }

    public view: ObjList;
    public controller: ObjListController;
    public model: XhrModel;
}