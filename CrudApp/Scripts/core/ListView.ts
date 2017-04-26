/// <reference path="../jquerydef/index.d.ts"/>

class ListView {
    private readonly list = "ListView_crud";
    constructor(protected app: string) {
        this.CreateList();
        this.CreateListElements();
    }
    private CreateList() {
        $(this.app).append('<ul class="' + this.list + '"></ul>');
    }
    private CreateListElements() {
        $("." + this.list).append("<li>Hello</li>");
        $("." + this.list).append("<li>World</li>");
    }
}

$("documnet").ready(() => {
    var list = new ListView(".test_list");
});