/// <reference path="../../references.ts"/>

class ObjListApp {
    constructor(public selector: string) {
        this.view = new ObjList(this.selector);
        this.controller = new ObjListController(this.view);
    }

    public view: ObjList;
    public controller: ObjListController;
}