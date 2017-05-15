/// <reference path="../Scripts/references.ts"/>
/// <reference path="./Mocks/XhrModelMockts.ts"/>


describe("ListController tests", () => {
    let model: XhrModelMock;
    let view: ListView;
    let controller: ListController;
    
    beforeEach(() => {
        setFixtures('<div class="list_view"></div>');
        view = new ListView("list_view");
    })

    describe("Element manipulation WITHOUT model", () => {
        let taskName: string;
        beforeEach(() => {
            let controller = new ListController(view);
            taskName = "New task 1";

            // It's possible to properly adding an element using controller but not view.
            // In this case used controller events
            view.input.val("New task 1");
            view.inputAddButton.trigger('click');
        });

        it("should add new element on clicking 'add' button", () => {
            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });

        it("should add new element on pressing 'Enter' key", () => {
            // There is an element in view yet, see beforeEach()
            view.input.val("New task 2");
            let keypress = $.Event("keypress")
            keypress.which = 13;
            view.input.trigger(keypress);

            expect(view.Items.length == 2).toBeTruthy("View.Items is empty");
            expect(view.Items[1].Text === "New task 2").toBeTruthy("Text is not correct");
        });

        it("should clear input field after adding", () => {
            expect($(view.input).val() === "").toBeTruthy("Input is not empty after add");
        });

        it("should not add if input is empty or has only spaces or tabs", () => {
            view.input.val("");
            view.inputAddButton.trigger('click');
            view.input.val("      ");
            view.inputAddButton.trigger('click');

            expect(view.Items.length == 1).toBeTruthy("View.Items is not empty!");
        });

        it("should remove the element when clicking the remove button", () => {
            view.input.val("Test2");
            view.inputAddButton.trigger('click');
            let elementId = "testremove";
            view.Items[0].root.attr("id", elementId);

            view.Items[0].removeButton.trigger('click');

            expect($("#" + elementId).length == 0).toBeTruthy(`Element '#${elementId}' is exist`);
        });
        it("should element to be editable when edit button is clicked", () => {
            let element = view.Items[0];
            element.editButton.trigger("click");
            expect(element.IsEdited).toBeTruthy(`IsEdit==${element.IsEdited} but shoul be false`);
        });

        it("should element to be standard when edit button is clicked", () => {
            let element = view.Items[0];
            element.editButton.trigger("click");
            element.saveButton.trigger("click");

            expect(!element.IsEdited).toBeTruthy(`IsEdit==${element.IsEdited} but shoul be false`);
        });

        it("should element to be standard when Enter pressed", () => {
            let element = view.Items[0];
            element.editButton.trigger("click");
            let keypress = $.Event("keypress")
            keypress.which = 13;
            element.editInput.trigger(keypress);

            expect(!element.IsEdited).toBeTruthy(`IsEdit==${element.IsEdited} but shoul be false`);
        });
    });

    describe("Element manipulation WITH model", () => {
        beforeEach(() => {
            model = new XhrModelMock();
            controller = new ListController(view, model);
        });

        it("Should use model.get when controller is created", () => {
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

        it("Should use model.put when updating the element", () => {
            view.Items[1].editButton.trigger("click");
            view.Items[1].editInput.val("New taskum");
            view.Items[1].saveButton.trigger("click");

            expect(model.putText == "New taskum")
                .toBeTruthy(`Incorrect put text "${model.putText}"`);
        });
    });
});