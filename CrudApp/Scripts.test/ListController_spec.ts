/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../Scripts/core/ListController.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListController tests", () => {
    describe("Add new element", () => {
        it("should rise event on clicking 'add' button", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            let spyEvent = spyOnEvent(view.InputButtonSelector, 'click');
            $(view.InputButtonSelector).trigger('click');

            expect('click').toHaveBeenTriggeredOn(view.InputButtonSelector);
            expect(controller.LastCommand == 'add').toBeTruthy("Event click has not been triggered")
        });

        it("should and new element on clicking 'add' button", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.InputSelector).val("New task 1");
            $(view.InputButtonSelector).trigger('click');

            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should not add if input is empty", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.InputSelector).val("");
            $(view.InputButtonSelector).trigger('click');

            expect(view.Items.length == 0).toBeTruthy("View.Items is not empty!");
        });
    });
});