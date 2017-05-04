/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListView tests", () => {
    describe("Create and add elements", () => {
        it("should create a new ListView in a div container", () => {
            setFixtures('<div class="list_view"></div>');

            let color = "w3-green";
            let view = new ListView("list_view", color);

            expect(".list_view").toContainElement(`ul, .${view.ulName}`);
            expect(view.root).toHaveClass("w3-green");
            
        });

        it("should create element when Add(text)", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");

            view.Add(0, "Hello world");

            expect(view.Items.length == 1).toBeTruthy("view.Items is empty or overflow");
            expect(view.Items[0].root).toContainText("Hello world");
            expect(view.Items[0].root).toHaveId("list_view_ul_li-0");
        });

        it("The first element should be input", () => {
            setFixtures('<div class="list_view"></div>');
            let color = "w3-green";
            let view = new ListView("list_view", color);

            expect(view.liInput).toContainElement("input");
            expect(view.input).toHaveClass(view.inputName);
            expect(view.input).toHaveClass(color);
        });

        it("The input should have a button 'Add' with hover color", () => {
            setFixtures('<div class="list_view"></div>');
            let hoverColor = "w3-hover-green";
            let color = "w3-green";
            let view = new ListView("list_view", color, hoverColor);

            expect(view.liInput).toContainElement("button");
            expect(view.inputAddButton).toHaveClass(view.inputButtonName);
            expect(view.inputAddButton).toHaveClass(hoverColor);
            expect(view.inputAddButton).toHaveClass(color);
            expect(view.inputAddButton).toHaveText("Add");
        });
    });
    describe("Remove elements", () => {
        it("should remove element when Remove(id)", () => {

        });
    });
});