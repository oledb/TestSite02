class ListController {
    constructor(public View: ListView) {
        $(this.View.InputButtonSelector)
            .on('click', () => {
                this.AddNewElementCommand();
            });
    }

    public LastCommand: string = "create";

    private AddNewElementCommand() {
        this.LastCommand = "add";
        let text = $(this.View.InputSelector).val();
        console.log(text);
        this.View.Add(0, text);
    }
}