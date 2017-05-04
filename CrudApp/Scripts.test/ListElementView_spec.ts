/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../Scripts/core/ListElementView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListElementView tests", () => {
    it("should create an elementView ", () => {
        setFixtures('<div class="list_view"></div>');

        let view = new ListView("list_view");
        let elementView = new ListElementView(view, 0);

        expect(view.root).toContainElement(`li, #${elementView.LiId}`);
    });

    it("should have invisible Remove button", () => {
        setFixtures('<div class="list_view"></div>');

        let view = new ListView("list_view");
        view.Add(0, "TestText");
        let elementView = view.Items[0];
        
        expect(elementView.root).toContainElement("div > button");
    });

    it("should show the Remove button when mouse on ");

    it("should hide the Remove button when mouse over");
});