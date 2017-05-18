/// <reference path="../../references.ts"/>

class ObjListElement {
    constructor(
        public changeStatus: (status: number) => boolean,
        public changeText: (text: string) => boolean,
        public completeObj: () => boolean
    ) {
        this.createView();
        this.setAnimation();
    }

    public root = $(`<li class="ov-element w3-animate-opacity"></li>`);

    //view
    public rootTable = $(`<table class="ov-table"></table`);
    public rootTableIcon = $(`<td class="ov-icon material-icons">check_box_outline_blank</td>`);
    public rootTableText = $(`<td class="ov-text">Net task</td>`);
    public rootTableDrop = $(`<td class="ov-menu dropdown"></td>`);

    //edit    

    private createView(): void {
        this.root.append(this.rootTable);
    }

    private setAnimation() {

    }

    public isEditable: boolean;
}