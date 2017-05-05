/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../Scripts/core/ListController.ts"/>
/// <reference path="./Mocks/XhrModelMockts.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListController tests", () => {
    let model: XhrModelMock;
    let view: ListView;
    let controller: ListController;
    beforeEach(() => {
        setFixtures('<div class="list_view"></div>');
        view = new ListView("list_view");
    })

    describe("Element manipulation WITHOUT model", () => {
        beforeEach(() => {
            let controller = new ListController(view);
        });

        it("should add new element on clicking 'add' button", () => {
            view.input.val("New task 1"); // Add text to input
            view.inputAddButton.trigger('click'); // Click on button

            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should add new element on pressing 'Enter' key", () => {
            view.input.val("New task 1");
            let keypress = $.Event("keypress")
            keypress.which = 13;
            view.input.trigger(keypress);

            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should clear input field after adding", () => {
            view.input.val("Test");
            view.inputAddButton.trigger('click');

            expect($(view.input).val() === "").toBeTruthy("Input is not empty after add");
        });

        it("should not add if input is empty or has only spaces or tabs", () => {
            view.input.val("");
            view.inputAddButton.trigger('click');
            view.input.val("      ");
            view.inputAddButton.trigger('click');

            expect(view.Items.length == 0).toBeTruthy("View.Items is not empty!");
        });

        it("should remove the element when clicking the remove button", () => {
            // It's possible to properly adding an element using controller but not view
            view.input.val("Test1");
            view.inputAddButton.trigger('click');
            view.input.val("Test2");
            view.inputAddButton.trigger('click');
            let elementId = view.Items[0].LiId;

            view.Items[0].removeButton.trigger('click');

            expect($("#" + elementId).length == 0).toBeTruthy(`Element '#${elementId}' is exist`);
        });
    });

    describe("Element manipulation WITH model", () => {
        beforeEach(() => {
            model = new XhrModelMock();
            controller = new ListController(view, model);
        });

        it("Should use model.get when controller created", () => {
            expect(model.getIndex == 1).toBeTruthy("Get method usage not equal 1");
        });

        it("Should get 2 objective when controller is creating", () => {
            expect(view.Items.length == 0).not.toBeTruthy("View.Items is empty");
            expect(view.Items.length == 2).toBeTruthy("View.Items has not 2 elements");
            expect(view.Items[0].textContainer).toHaveText(view.Items[0].Text);
        });

        it("Should use model.post when adding new element", () => {
            view.input.val("Test task 007");
            view.inputAddButton.trigger('click');

            expect(model.postIndex == 1).toBeTruthy("Post did not used");
            expect(model.postText == "Test task 007")
                .toBeTruthy("Post text is not matching");
        });

        it("Should use model.remove when deleting the element", () => {
            view.input.val("Test task 1");
            view.inputAddButton.trigger('click');
            view.input.val("Test task 2");
            view.inputAddButton.trigger('click');
            let id = view.Items[3].Id;

            view.Items[3].removeButton.trigger("click");
            expect(controller.LastCommand == "remove")
                .toBeTruthy("Controller did not use remove command");
            expect(model.removeId == id)
                .toBeTruthy(`Model.Remove. ${model.removeId} != ${id}`)
        });

        it("Should can remove element which was created by model", () => {
            let id = view.Items[1].Id;

            view.Items[1].removeButton.trigger("click");
            expect(controller.LastCommand == "remove")
                .toBeTruthy(`Last command should be remove not ${controller.LastCommand}`);
            expect(model.removeId == id)
                .toBeTruthy(`Model.Remove. ${model.removeId} != ${id}`)
        });
    });
});