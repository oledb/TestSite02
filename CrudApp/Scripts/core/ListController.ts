﻿class ListController {
    constructor(public View: ListView, private model?: IXhrModel) {
        this.SetEventsToAddButton();
        if (model != undefined) {
            this.GetAllElements();
        }
    }

    public LastCommand: string = "create";

    private GetAllElements(): void {
        this.model.Get((result) => {
            for (let obj of (result as any[])) {
                this.addNewElement(obj);
        }
        });
    }

    private tempId = 0;

    private AddNewElementCommand():void {
        this.LastCommand = "add";
        let text = (this.View.input.val() as string).trim();
        if (text != "") {
            let data = { objectiveId: undefined, name: text };
            if (this.model != undefined)
                this.model.Post(data, (result) => data.objectiveId = result);
            else
                data.objectiveId = this.tempId++;
            this.addNewElement(data);
        }
        this.View.input.val("");
    }

    private RemoveElementCommand(element: ListElementView) {
        this.LastCommand = "remove";
        if (this.model != undefined) {
            this.model.Delete(element.Id, () => {
                this.View.Remove(element.Id);
            })
        }
        else
            this.View.Remove(element.Id);
    }

    private SetEventsToAddButton():void {
        $(this.View.inputAddButton)
            .on('click', () => {
                this.AddNewElementCommand();
            });
        $(this.View.input).keypress((e) => {
            let key = e.which;
            if (key == 13) { // Enter
                this.AddNewElementCommand();
            }
        });
    }

    private SetEventsToNewElement(element: ListElementView): void {
        element.removeButton.on("click", () => {
            this.RemoveElementCommand(element);
        });
    }

    private addNewElement(data: any) {
        let temp = this.View.Add(data.objectiveId, data.name);
        this.SetEventsToNewElement(temp);
    }
}