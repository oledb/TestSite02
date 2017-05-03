describe("ListController tests", function () {
    describe("Add new element", function () {
        it("should add new element on clicking 'add' button", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            OnClickingButton(view, "New task 1");
            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });
        it("should add new element on pressing 'Enter' key", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.input).val("New task 1");
            var keypress = $.Event("keypress");
            keypress.which = 13;
            $(view.input).trigger(keypress);
            expect(view.Items.length == 1).toBeTruthy("View.Items is empty");
            expect(view.Items[0].Text === "New task 1").toBeTruthy("Text is not correct");
        });
        it("should clear input field after adding", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.input).val("Test");
            $(view.inputAddButton).trigger('click');
            expect($(view.input).val() === "").toBeTruthy("Input is not empty after add");
        });
        it("should not add if input is empty or has only spaces or tabs", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var controller = new ListController(view);
            $(view.input).val("");
            $(view.inputAddButton).trigger('click');
            $(view.input).val("      ");
            $(view.inputAddButton).trigger('click');
            $(view.input).val("         ");
            $(view.inputAddButton).trigger('click');
            expect(view.Items.length == 0).toBeTruthy("View.Items is not empty!");
        });
    });
    describe("Test controller with model", function () {
        it("Should use model when controller created", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var model = new XhrModelMock();
            var controller = new ListController(view, model);
            expect(model.getIndex == 1).toBeTruthy("Get method usage not equal 1");
        });
        it("Should get 2 objective when controller is creating", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var model = new XhrModelMock();
            var controller = new ListController(view, model);
            expect(view.Items.length == 0).not.toBeTruthy("View.Items is empty");
            expect(view.Items.length == 2).toBeTruthy("View.Items has not 2 elements");
            expect(view.Items[0].selector.liId).toHaveText(view.Items[0].Text);
        });
        it("Should use model when add new element", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var model = new XhrModelMock();
            var controller = new ListController(view, model);
            OnClickingButton(view, "Test task 007");
            expect(model.postIndex == 1).toBeTruthy("Post did not used");
            expect(model.postText == "Test task 007").toBeTruthy("Post text is not matching");
        });
    });
});
function OnClickingButton(view, inputValue) {
    $(view.input).val(inputValue);
    $(view.inputAddButton).trigger('click');
}
