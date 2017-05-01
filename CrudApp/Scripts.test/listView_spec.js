describe("ListView tests", function () {
    describe("ListView with elements", function () {
        it("should create a new ListView in a div container", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view", "w3-green");
            expect(".list_view").toContainElement("ul");
            expect("ul").toHaveClass("w3-ul");
            expect("ul").toHaveClass("w3-card");
            expect("ul").toHaveClass("w3-green");
            expect("ul").toHaveClass(view.Ul);
        });
        it("should have element when Add(text)", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            view.Add("Hello world");
            expect(view.ClassUl).toContainElement("li");
            expect("li").toContainText("Hello world");
        });
        it("The first element should be input", function () {
            setFixtures('<div class="list_view"></div>');
            var color = "w3-green";
            var view = new ListView("list_view", color);
            expect("li").toContainElement("input");
            expect("li").toHaveClass("w3-display-container");
            expect("input").toHaveClass(view.Input);
            expect(view.ClassInput).toHaveClass(color);
            expect(view.ClassInput).toHaveClass("w3-margin-0");
            expect(view.ClassInput).toHaveClass("w3-input");
            expect(view.ClassInput).toHaveClass("w3-border-0");
            expect(view.ClassInput).toHaveAttr("type", "text");
            expect(view.ClassInput).toHaveAttr("placeholder", "Press Enter to add a task");
            expect(view.ClassInput).toHaveAttr("style", "outline: none; padding: 0px;");
        });
        it("The input should have a button 'Add' with hover color", function () {
            setFixtures('<div class="list_view"></div>');
            var hoverColor = "w3-hover-green";
            var color = "w3-green";
            var view = new ListView("list_view", color, hoverColor);
            expect("li").toContainElement("button");
            expect("button").toHaveClass(view.InputButton);
            expect(view.ClassInputButton).toHaveClass("w3-button");
            expect(view.ClassInputButton).toHaveClass("w3-display-right");
            expect(view.ClassInputButton).toHaveClass(hoverColor);
            expect(view.ClassInputButton).toHaveClass(color);
            expect(view.ClassInputButton).toHaveText("Add");
        });
    });
    describe("Element only", function () {
        it("should create a elementView ", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var elementView = new ListElementView(view);
            expect(view.ClassUl).toContainElement("li");
            expect(elementView.ClassLiName).toHaveClass("w3-display-container");
        });
    });
});
