/// <reference path="../../references.ts"/>

class ObjListElement {
    constructor(public objective: IObjective) {
        this.createView();
        this.text = objective.name;
        this.setEvents();
    }

    ///
    /// Fields
    ///
    public root = $(`<li class="ov-element w3-animate-opacity"></li>`);

    //view
    private rootTable = $(`<table class="ov-table"></table`);
    private rootTableIcon = $(`<td class="ov-icon material-icons">check_box_outline_blank</td>`);
    protected rootTableText = $(`<td class="ov-text"></td>`);
    private rootTableDrop = $(`<td class="ov-menu dropdown"></td>`);
    protected rootMenu = {
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
    protected rootEditInput = $(`<input class="w3-white ov-input" type="text">`);
    protected rootEditSaveBtn = $(`<button class="w3-button w3-red">Save</button>`);


    ///
    /// Properties
    ///
    public get text(): string {
        return this.objective.name;
    }

    public set text(value: string) {
        this.rootTableText.text(value);
        this.objective.name = value;
    }

    public get status(): ObjectiveStatus {
        return this.objective.status;
    }

    public set status(value: ObjectiveStatus) {
        this.updateStatus(value);
    }

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
        let cancelBtn = $(`<button class="w3-button w3-white w3-margin-left">Отмена</button>`);

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
        this.rootTableText.on("click", this.editModeOn);
        this.rootEditInput.on("focusout", this.editModeOff);
        this.rootEditSaveBtn.on("mousedown", () => {
            this.onupdate(this, { name: this.rootEditInput.val() });
        });

        this.rootMenu.editBtn.on("click", this.editModeOn);
        this.rootMenu.wipBtn.on("click", () => {
            this.updateStatus(ObjectiveStatus.WorkInProgress);
            this.onupdate(this, this.objective);
        });
        this.rootMenu.waitBtn.on("click", () => {
            this.updateStatus(ObjectiveStatus.Waiting);
            this.onupdate(this, this.objective);
        });
        this.rootMenu.newBtn.on("click", () => {
            this.updateStatus(ObjectiveStatus.New);
            this.onupdate(this, this.objective);
        });
        this.rootMenu.cancelBtn.on("click", () => {
            this.updateStatus(ObjectiveStatus.Cancel);
            this.onupdate(this, this.objective);
        });
    }

    private editModeOn = () => {
        this.rootTable.hide();
        this.rootEdit.show();
        this.rootEditInput.val(this.text);
        this.rootEditInput.trigger("focus");
    }

    private editModeOff = () => {
        this.rootTable.show();
        this.rootEdit.hide();
    }

    public update(obj: IObjective): void {
        this.text = obj.name;
        this.status = obj.status;
    }

    private updateStatus(status: ObjectiveStatus) {
        this.objective.status = status;
        this.root.removeClass("status-wip status-cancel status-complete status-wait status-new");
        let statusClass: string;
        switch (status) {
            case ObjectiveStatus.Cancel:
                statusClass = "status-cancel";
                break;
            case ObjectiveStatus.WorkInProgress:
                statusClass = "status-wip";
                break;
            case ObjectiveStatus.Completed:
                statusClass = "status-complete";
                break;
            case ObjectiveStatus.Waiting:
                statusClass = "status-wait";
                break;
            case ObjectiveStatus.New:
                statusClass = "status-new";
                break;
        }
        this.root.addClass(statusClass);
    } 

    /// Events
    public onupdate: (sender: ObjListElement, obj: IObjective) => void;
}