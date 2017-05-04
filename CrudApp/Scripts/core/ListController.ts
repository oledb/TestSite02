class ListController {
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
                this.View.Add(obj.objectiveId, obj.name);
        }
        });
    }

    private AddNewElementCommand():void {
        this.LastCommand = "add";
        let text = ($(this.View.input).val() as string).trim();
        if (text != "") {
            if (this.model != undefined) {
                let data = { objectiveId: undefined, name: text };
                this.model.Post(data, (result) => {
                    //TODO get id
                    console.log("result is " + result);
                    this.View.Add(result, text);
                });
            }
            else {
                this.View.Add(0, text);
            }
        }
        $(this.View.input).val("");
    }

    private SetEventsToAddButton():void {
        $(this.View.inputAddButton)
            .on('click', () => {
                this.AddNewElementCommand();
            });
        $(this.View.input).keypress((e) => {
            let key = e.which;
            if (key == 13) {
                this.AddNewElementCommand();
            }
        });
    }
}