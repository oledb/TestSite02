describe("ListView tests", function () {
    describe("Create and add elements", function () {
        it("should create a new ListView in a div container", function () {
            setFixtures('<div class="list_view"></div>');
            var color = "w3-green";
            var view = new ListView("list_view", color);
            expect(".list_view").toContainElement("ul, ." + view.ulName);
            expect(view.root).toHaveClass("w3-green");
        });
        it("should have element when Add(text)", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            view.Add(0, "Hello world");
            expect(view.Items.length == 1).toBeTruthy("view.Items is empty or overflow");
            expect(view.Items[0].root).toContainText("Hello world");
            expect(view.Items[0].root).toHaveId("list_view_ul_li-0");
        });
        it("The first element should be input", function () {
            setFixtures('<div class="list_view"></div>');
            var color = "w3-green";
            var view = new ListView("list_view", color);
            expect(view.liInput).toContainElement("input");
            expect(view.input).toHaveClass(view.inputName);
            expect(view.input).toHaveClass(color);
        });
        it("The input should have a button 'Add' with hover color", function () {
            setFixtures('<div class="list_view"></div>');
            var hoverColor = "w3-hover-green";
            var color = "w3-green";
            var view = new ListView("list_view", color, hoverColor);
            expect(view.liInput).toContainElement("button");
            expect(view.inputAddButton).toHaveClass(view.inputButtonName);
            expect(view.inputAddButton).toHaveClass(hoverColor);
            expect(view.inputAddButton).toHaveClass(color);
            expect(view.inputAddButton).toHaveText("Add");
        });
    });
});
