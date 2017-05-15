/// <reference path="../../references.ts"/>

class ListApp {
    constructor(public selector: string, public apiRouter: string, public error) {
        this.view = new ListView(selector, "w3-white", "w3-hove-lime");
        this.model = new XhrModel(apiRouter, error);
        this.controller = new ListController(this.view, this.model);
    }

    public view: ListView;
    public controller: ListController;
    public model: IXhrModel;
}