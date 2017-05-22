/// <reference path="../../references.ts"/>

class ObjListElement {
    constructor(public objective: IObjective) {
        this.createView();
        this.setEvents();
        this.text = objective.name;
    }

    ///
    /// Fields
    ///
    public root = $(`<li class="ov-element w3-animate-opacity"></li>`);

    //view
    private rootTable = $(`<table class="ov-table"></table`);
    private rootTableIcon = $(`<td class="ov-icon material-icons">check_box_outline_blank</td>`);
    private rootTableText = $(`<td class="ov-text"></td>`);
    private rootTableDrop = $(`<td class="ov-menu dropdown"></td>`);
    private rootMenu = {
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


    ///
    /// Properties
    ///
    public get text(): string{
        return this.rootTableText.text();
    }

    public set text(value: string) {
        this.rootTableText.text(value);
    }

    ///
    /// Events
    ///
    public eventChangeStatus: (obj: IObjective) => boolean;
    public eventChangeText: (obj: IObjective) => boolean;
    public eventDestroyElement: (obj: IObjective) => void;
    public eventRemoveObj: (id: number) => boolean;

    ///
    /// Methods
    ///

    //// Private Methods
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
        for (let elem in this.rootMenu) {
            dropContent.append(this.rootMenu[elem]);
        }

        //Edit
        this.rootEdit.append(this.rootEditInput, editBtns);
        editBtns.append(this.rootEditSaveBtn, cancelBtn);
    }

    private setEvents() {
        this.rootTableIcon.on("click", this.changeStatusToCompelte);
    }

    // Actions
    private changeStatusToCompelte = () => {
        if (!this.eventChangeStatus(this.objective))
            return;
        this.animateFadeOut();
        setTimeout(this.hide, 500);
    }

    private animateFadeOut() {
        this.rootTableIcon.text("check_box");
        this.root.addClass("animated fadeOut");
    }

    private hide = () => {
        this.root.hide();
        this.eventDestroyElement(this.objective);
    }
}