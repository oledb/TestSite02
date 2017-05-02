/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../Scripts/core/ListElementView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListElementView test", () => {
    describe("Element only", () => {
        it("should create an elementView ", () => {
            setFixtures('<div class="list_view"></div>');

            let view = new ListView("list_view");
            let elementView = new ListElementView(view, 0);

            expect(view.UlSelector).toContainElement("li");
        });
    });
});