/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListView tests", () => {
    describe("Design only without animation and events", () => {
        it("should create a new ListView in a div container", () => {
            setFixtures('<div class="list_view"></div>');

            let color = "w3-green";
            let view = new ListView("list_view", color);
            
            expect(".list_view").toContainElement("ul");
            expect("ul").toHaveClass("w3-green");
            expect("ul").toHaveClass(view.Ul);
            
        });

        it("should have element when Add(text)", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");

            view.Add(0, "Hello world");

            expect(view.UlSelector).toContainElement("li");
            expect("li").toContainText("Hello world");
            expect("#list_view_ul_li-0").toContainText("Hello world");
        });

        it("The first element should be input", () => {
            setFixtures('<div class="list_view"></div>');
            let color = "w3-green";
            let view = new ListView("list_view", color);

            expect("li").toContainElement("input");
            expect("input").toHaveClass(view.Input);
            expect(view.InputSelector).toHaveClass(color);
        });

        it("The input should have a button 'Add' with hover color", () => {
            setFixtures('<div class="list_view"></div>');
            let hoverColor = "w3-hover-green";
            let color = "w3-green";
            let view = new ListView("list_view", color, hoverColor);

            expect("li").toContainElement("button");
            expect("button").toHaveClass(view.InputButton);
            expect(view.InputButtonSelector).toHaveClass(hoverColor);
            expect(view.InputButtonSelector).toHaveClass(color);
            expect(view.InputButtonSelector).toHaveText("Add");
        });
    });
});