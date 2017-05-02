class ListController {
    constructor(public View: ListView) {
        $(this.View.InputButtonSelector)
            .on('click', () => {
                this.AddNewElementCommand();
            });
        $(this.View.InputSelector).keypress((e) => {
            let key = e.which;
            if (key == 13) {
                this.AddNewElementCommand();
            }
        });
    }

    public LastCommand: string = "create";

    private AddNewElementCommand() {
        this.LastCommand = "add";
        let text = ($(this.View.InputSelector).val() as string).trim();
        if (text != "") {
            this.View.Add(0, text);
        }
        $(this.View.InputSelector).val("");
    }
}