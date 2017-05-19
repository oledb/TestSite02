/// <reference path="../../references.ts"/>

class ObjListElement {
    constructor(public objective: IObjective) {
        this.createView();
        this.setEvents();
    }

    // Events
    public eventChangeStatus: (obj: IObjective) => boolean;
    public eventChangeText: (obj: IObjective) => boolean;
    public eventCompleteObj: (obj: IObjective) => boolean;

    // JQuery fields
    public root = $(`<li class="ov-element w3-animate-opacity"></li>`);

    //view
    private rootTable = $(`<table class="ov-table"></table`);
    private rootTableIcon = $(`<td class="ov-icon material-icons">check_box_outline_blank</td>`);
    private rootTableText = $(`<td class="ov-text">Net task</td>`);
    private rootTableDrop = $(`<td class="ov-menu dropdown"></td>`);
    private rootTableDropBtns = {
        editBtn: $(`<button class="content-button">Редактировать</button>`),
        removeBtn: $(`<button class="content-button">Удалить</button>`),
        setProjectBtn: $(`<button class="content-button">Назначить проект</button>`),
        hr: $(`<hr/>`),
        wipBtn: $(`<button class="content-button">В процессе</button>`),
        waitBtn: $(`<button class="content-button">Ожидание</button>`),
        cancelBtn: $(`<button class="content-button">Омена</button>`),
        newBtn: $(`<button class="content-button">Новый</button>`)
    };

    //edit    
    private rootEdit = $(`<div class="ov-edit" style="display: none;"></div>`);
    private rootEditInput = $(`<input class="w3-white ov-input" type="text">`);
    private rootEditSaveBtn = $(`<button class="w3-button w3-red">Save</button>`);

    private createView(): void {
        //locals
        let tr = $("<tr></tr>");
        let dropIcon = $(`<a class="material-icons">more_horiz</a>`);
        let dropContent = $(`<div class="dropdown-content w3-card-2"></div>`);
        let editBtns = $(`<div></div>`);
        let cancelBtn = $(`<button class="content-button">Отмена</button>`);

        //Appends
        this.root.append(this.rootTable, this.rootEdit);
        //Table
        this.rootTable.append(tr);
        tr.append(this.rootTableIcon, this.rootTableText, this.rootTableDrop);
        this.rootTableDrop.append(dropIcon, dropContent);
        for (let elem in this.rootTableDropBtns) {
            dropContent.append(this.rootTableDropBtns[elem]);
        }

        //Edit
        this.rootEdit.append(this.rootEditInput, editBtns);
        editBtns.append(this.rootEditSaveBtn, cancelBtn);
    }

    private setEvents() {

    }

    public isEditable: boolean;
}