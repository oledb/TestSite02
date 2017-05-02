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
        it("should and new element on clicking 'add' button", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.InputSelector).val("New task 1");
            $(view.InputButtonSelector).trigger('click');
            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });
        it("should not add if input is empty", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.InputSelector).val("");
            $(view.InputButtonSelector).trigger('click');
            expect(view.Items.length == 0).toBeTruthy("View.Items is not empty!");
        });
    });
});
