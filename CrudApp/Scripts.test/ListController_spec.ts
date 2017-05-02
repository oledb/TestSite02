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

        it("should add new element on clicking 'add' button", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.InputSelector).val("New task 1");
            $(view.InputButtonSelector).trigger('click');

            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should add new element on pressing 'Enter' key", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.InputSelector).val("New task 1");
            let keypress = $.Event("keypress")
            keypress.which = 13;
            $(view.InputSelector).trigger(keypress);

            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should clear input field after adding", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.InputSelector).val("Test");
            $(view.InputButtonSelector).trigger('click');

            expect($(view.InputSelector).val() === "").toBeTruthy("Input is not empty after add");
        });

        it("should not add if input is empty or has only spaces or tabs", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.InputSelector).val("");
            $(view.InputButtonSelector).trigger('click');
            $(view.InputSelector).val("      ");
            $(view.InputButtonSelector).trigger('click');
            $(view.InputSelector).val("         ");
            $(view.InputButtonSelector).trigger('click');

            expect(view.Items.length == 0).toBeTruthy("View.Items is not empty!");
        });
    });
    describe("Test controller with model", () => {
        it("Should use model when controller created");

        it("Should get 2 objective when controller is creating");

        it("Should use model when add new element");
    });
});