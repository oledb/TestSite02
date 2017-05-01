/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListView tests", () => {
    describe("ListView with elements", () => {
        it("should create a new ListView in a div container", () => {
            setFixtures('<div class="list_view"></div>');

            let view = new ListView("list_view", "w3-green");
            
            expect(".list_view").toContainElement("ul");
            expect("ul").toHaveClass("w3-ul");
            expect("ul").toHaveClass("w3-card");
            expect("ul").toHaveClass("w3-green");
            expect("ul").toHaveClass(view.UlName);
        });

        it("should have element when Add(text)", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");

            view.Add("Hello world");

            expect(view.ClassUlName).toContainElement("li");
            expect("li").toContainText("Hello world");
        });

        it("The first element should be input", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");


        });
    });

    describe("Element only", () => {
        it("should create a elementView ", () => {
            setFixtures('<div class="list_view"></div>');

            let view = new ListView("list_view");
            let elementView = new ListElementView(view);

            expect(view.ClassUlName).toContainElement("li");
            expect(elementView.ClassLiName).toHaveClass("w3-display-container");
        });
    });
});