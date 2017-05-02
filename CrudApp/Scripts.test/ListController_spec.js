describe("ListController tests", function () {
    describe("Add new element", function () {
        it("should rise event on clicking 'add' button", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            var spyEvent = spyOnEvent(view.InputButtonSelector, 'click');
            $(view.InputButtonSelector).trigger('click');
            expect('click').toHaveBeenTriggeredOn(view.InputButtonSelector);
            expect(controller.LastCommand == 'add').toBeTruthy("Event click has not been triggered");
        });
        it("should add new element on clicking 'add' button", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.InputSelector).val("New task 1");
            $(view.InputButtonSelector).trigger('click');
            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });
        it("should add new element on pressing 'Enter' key", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.InputSelector).val("New task 1");
            var keypress = $.Event("keypress");
            keypress.which = 13;
            $(view.InputSelector).trigger(keypress);
            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });
        it("should clear input field after adding", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.InputSelector).val("Test");
            $(view.InputButtonSelector).trigger('click');
            expect($(view.InputSelector).val() === "").toBeTruthy("Input is not empty after add");
        });
        it("should not add if input is empty or has only spaces or tabs", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.InputSelector).val("");
            $(view.InputButtonSelector).trigger('click');
            $(view.InputSelector).val("      ");
            $(view.InputButtonSelector).trigger('click');
            $(view.InputSelector).val("         ");
            $(view.InputButtonSelector).trigger('click');
            expect(view.Items.length == 0).toBeTruthy("View.Items is not empty!");
        });
    });
    describe("Test controller with model", function () {
        it("Should get 2 objective when controller is creating");
        it("Should use model when add new element");
    });
});
