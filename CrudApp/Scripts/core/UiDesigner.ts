class UiDesigner {
    static CreateButton(value: string, ...classes: string[]): JQuery {
        let temp = $("<button></button>")
            .text(value);
        for (let elem of classes)
            temp.addClass(elem);
        return temp;
    }
}