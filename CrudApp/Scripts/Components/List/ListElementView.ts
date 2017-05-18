/// <reference path="../../references.ts"/>

class ListElementView {
    constructor(public listView: ListView, public Id: number, public Text: string = "") {
        this.GetElement(this.Text).appendTo(listView.root);
        this.SetAnimation();
    }
    
    public root: JQuery;
    public buttonsContainer: JQuery;
    public textContainer: JQuery;
    public removeButton: JQuery;
    public editButton: JQuery;
    public saveButton: JQuery;
    public editInput: JQuery;
    public completeButton: JQuery;

    private GetElement(text: string): JQuery {
        this.root = $(`<li class="w3-display-container w3-animate-opacity"></li>`)
        this.textContainer = $("<span></span>").text(text)
        this.buttonsContainer = $(`<div class="w3- display - right"></div>`)
        this.completeButton = $(`<input class="w3-check" type="checkbox">`);
        this.saveButton = this.GetButton("Save").hide();
        this.editButton = this.GetButton("Edit");
        this.removeButton = this.GetButton("Remove");

        this.root.append(this.textContainer, this.buttonsContainer);
        this.buttonsContainer.append(
            this.saveButton,
            this.editButton,
            this.removeButton);
       return this.root;
    }

    private GetButton(text: string): JQuery {
        return UiDesigner.CreateButton(text,
            this.listView.color,
            this.listView.hoverColor,
            "w3-button");
    }

    private SetAnimation(): void {
        this.buttonsContainer.hide();
        $(this.root).on("mouseover", () => {
            if (this.isEdited) return;
            $(this.buttonsContainer).show();
        });
        $(this.root).on("mouseout", () => {
            if (this.isEdited) return;
            $(this.buttonsContainer).hide();
        });
    }

    private isEdited = false;
    get IsEdited(): boolean {
        return this.isEdited;
    }
    public Edit(): void {
        if (this.isEdited) return;
        this.saveButton.show();
        this.editButton.hide();
        this.removeButton.hide();
        this.CreateEditInput().appendTo(this.textContainer);
        this.editInput.focus();
        this.isEdited = true;
    }

    public Save(): void {
        if (!this.isEdited) return;
        this.saveButton.hide();
        this.editButton.show();
        this.removeButton.show();
        this.Text = this.editInput.val();
        this.editInput.remove();
        this.editInput = undefined;
        this.textContainer.text(this.Text);
        this.isEdited = false;
    }

    private CreateEditInput(): JQuery {
        this.textContainer.text("");
        this.editInput = $("<input></input>")
            .addClass(this.listView.color)
            .addClass("w3-margin-0 w3-input w3-border-0")
            .attr("type", "text")
            .css({ outline: "none", padding: "0px" })
            .val(this.Text);
        return this.editInput;
    }
}