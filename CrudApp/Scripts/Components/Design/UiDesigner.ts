class UiDesigner {
    static CreateButton(value: string, ...classes: string[]): JQuery {
        let temp = $("<button></button>")
            .text(value);
        for (let elem of classes)
            temp.addClass(elem);
        return temp;
    }
    static CreateContainer(...classes: string[]): JQuery {
        let temp = $("<div></div>");
        for (let elem of classes)
            temp.addClass(elem);
        return temp;
    }

    static CreateTag(tag: string, ...classes: string[]): JQuery {
        let temp = $(`<${tag}></${tag}>`);
        for (let elem of classes)
            temp.addClass(elem);
        return temp;
    }
}