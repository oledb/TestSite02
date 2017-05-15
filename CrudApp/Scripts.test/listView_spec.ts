/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListView tests", () => {
    let hoverColor = "w3-hover-green";
    let color = "w3-green";
    let view: ListView;
    beforeEach(() => {
        setFixtures('<div class="list_view"></div>');
        view = new ListView("list_view", color, hoverColor);
    });
    describe("Create and add elements", () => {
        it("should create a new ListView in a div container", () => {
            expect(".list_view").toContainElement(`ul`);
            expect(view.root).toHaveClass("w3-green");
            
        });

        it("should create element when Add(text)", () => {
            view.Add(0, "Hello world");

            expect(view.Items.length == 1).toBeTruthy("view.Items is empty or overflow");
            expect(view.Items[0].root).toContainText("Hello world");
        });

        it("The first element should be input", () => {
            expect(view.root).toContainElement("li:first > input");
            expect(view.input).toHaveClass(color);
        });

        it("The input should have a button 'Add' with hover color", () => {
            expect(view.liInput).toContainElement("button");
            expect(view.inputAddButton).toHaveClass(hoverColor);
            expect(view.inputAddButton).toHaveClass(color);
            expect(view.inputAddButton).toHaveText("Add");
        });
    });

    describe("Remove elements", () => {
        it("should remove element when Remove(id)", () => {
            view.Add(1, "Test task 01");
            view.Add(4, "Test task 02");
            view.Add(7, "Test task 03");
            let elementId = "testremove001";
            view.Items[1].root.attr("id", elementId);

            view.Remove(4);

            expect(view.Items.length == 2).toBeTruthy("Element was not removed");
            expect(view.Items[1].Text == "Test task 03").toBeTruthy("Incorrect name");
            expect($("#" + elementId).length == 0).toBeTruthy(`Element '#${elementId}' is exist`);
        });
    });
});