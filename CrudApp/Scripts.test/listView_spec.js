describe("ListView tests", function () {
    describe("Create and add elements", function () {
        it("should create a new ListView in a div container", function () {
            setFixtures('<div class="list_view"></div>');
            var color = "w3-green";
            var view = new ListView("list_view", color);
            expect(".list_view").toContainElement("ul");
            expect("ul").toHaveClass("w3-green");
            expect("ul").toHaveClass(view.Ul);
        });
        it("should have element when Add(text)", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            view.Add(0, "Hello world");
            expect(view.UlSelector).toContainElement("li");
            expect("li").toContainText("Hello world");
            expect("#list_view_ul_li-0").toContainText("Hello world");
        });
        it("The first element should be input", function () {
            setFixtures('<div class="list_view"></div>');
            var color = "w3-green";
            var view = new ListView("list_view", color);
            console.log(view);
            expect(view.liInput).toContainElement("input");
            expect(view.input).toHaveClass(view.inputClass);
            expect(view.input).toHaveClass(color);
        });
        it("The input should have a button 'Add' with hover color", function () {
            setFixtures('<div class="list_view"></div>');
            var hoverColor = "w3-hover-green";
            var color = "w3-green";
            var view = new ListView("list_view", color, hoverColor);
            expect("li").toContainElement("button");
            expect("button").toHaveClass(view.inputButtonClass);
            expect(view.inputAddButton).toHaveClass(hoverColor);
            expect(view.inputAddButton).toHaveClass(color);
            expect(view.inputAddButton).toHaveText("Add");
        });
    });
});
