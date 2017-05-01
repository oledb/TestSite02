describe("ListView tests", function () {
    describe("ListView with elements", function () {
        it("should create a new ListView in a div container", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view", "w3-green");
            expect(".list_view").toContainElement("ul");
            expect("ul").toHaveClass("w3-ul");
            expect("ul").toHaveClass("w3-card");
            expect("ul").toHaveClass("w3-green");
            expect("ul").toHaveClass(view.UlName);
        });
        it("should have element when Add(text)", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            view.Add("Hello world");
            expect(view.ClassUlName).toContainElement("li");
            expect("li").toContainText("Hello world");
        });
    });
    describe("Element only", function () {
        it("should create a elementView ", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var elementView = new ListElementView(view);
            expect(view.ClassUlName).toContainElement("li");
            expect(elementView.ClassLiName).toHaveClass("w3-display-container");
        });
    });
});
