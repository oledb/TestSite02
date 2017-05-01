/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListView tests", () => {
    describe("ListView with elements", () => {
        it("should create a new ListView in a div container", () => {
            setFixtures('<div class="list_view"></div>');

            let view = new ListView("list_view");
            
            expect(".list_view").toContainElement("ul");
            expect("ul").toHaveClass("w3-ul");
            expect("ul").toHaveClass("w3-card");
            expect("ul").toHaveClass(view.UlName);
        });
    });

    describe("Element only", () => {
        it("should create a single element", () => {
            setFixtures('<div class="list_view"></div>');

            let view = new ListView("list_view");
            let elementView = new ListElementView(view);

            expect(view.ClassUlName).toContainElement("li");
        });
    });
});