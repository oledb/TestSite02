class ListView {
    constructor(public app: string) {
        $(`.${this.app}`).append(this.CreateList());
    }

    private CreateList(): string {
        return "<ul></ul>"
    }
}

$("window").ready(() => {
    let view = new ListView("test_list");
});