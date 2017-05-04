/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../Scripts/core/ListController.ts"/>
/// <reference path="./Mocks/XhrModelMockts.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListController tests", () => {
    describe("Add new element", () => {
        //it("should rise event on clicking 'add' button", () => {
        //    setFixtures('<div class="list_view"></div>');
        //    let view = new ListView("list_view");
        //    let controller = new ListController(view);

        //    let spyEvent = spyOnEvent(view.inputAddButton.selector, 'click');
        //    $(view.inputAddButton).trigger('click');

        //    expect('click').toHaveBeenTriggeredOn(view.inputAddButton.selector);
        //    expect(controller.LastCommand == 'add').toBeTruthy("Event click has not been triggered")
        //});

        it("should add new element on clicking 'add' button", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);
            
            OnClickingButton(view, "New task 1");

            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should add new element on pressing 'Enter' key", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.input).val("New task 1");
            let keypress = $.Event("keypress")
            keypress.which = 13;
            $(view.input).trigger(keypress);

            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should clear input field after adding", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.input).val("Test");
            $(view.inputAddButton).trigger('click');

            expect($(view.input).val() === "").toBeTruthy("Input is not empty after add");
        });

        it("should not add if input is empty or has only spaces or tabs", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let controller = new ListController(view);

            $(view.input).val("");
            $(view.inputAddButton).trigger('click');
            $(view.input).val("      ");
            $(view.inputAddButton).trigger('click');
            $(view.input).val("         ");
            $(view.inputAddButton).trigger('click');

            expect(view.Items.length == 0).toBeTruthy("View.Items is not empty!");
        });
    });

    describe("Remove elements", () => {
        it("should remove the element when clicking the remove button");
    });

    describe("Test controller with model", () => {
        it("Should use model when controller created", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let model = new XhrModelMock();
            let controller = new ListController(view, model);

            expect(model.getIndex == 1).toBeTruthy("Get method usage not equal 1");
        });

        it("Should get 2 objective when controller is creating", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let model = new XhrModelMock();
            let controller = new ListController(view, model);

            expect(view.Items.length == 0).not.toBeTruthy("View.Items is empty");
            expect(view.Items.length == 2).toBeTruthy("View.Items has not 2 elements");
            expect(view.Items[0].textContainer).toHaveText(view.Items[0].Text);
        });

        it("Should use model.post when adding new element", () => {
            setFixtures('<div class="list_view"></div>');
            let view = new ListView("list_view");
            let model = new XhrModelMock();
            let controller = new ListController(view, model);

            OnClickingButton(view, "Test task 007");

            expect(model.postIndex == 1).toBeTruthy("Post did not used");
            expect(model.postText == "Test task 007").toBeTruthy("Post text is not matching");
        });

        it("Should use model.remove when deleting the element");
    });
});

function OnClickingButton(view: ListView, inputValue: string) {
    $(view.input).val(inputValue);
    $(view.inputAddButton).trigger('click');
}