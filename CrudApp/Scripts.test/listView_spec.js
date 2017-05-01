describe("ListView tests", function () {
    describe("ListView with elements", function () {
        it("should create a new ListView in a div container", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            expect(".list_view").toContainElement("ul");
            expect("ul").toHaveClass("w3-ul");
            expect("ul").toHaveClass("w3-card");
            expect("ul").toHaveClass(view.UlName);
        });
    });
    describe("Element only", function () {
        it("should create a single element", function () {
            setFixtures('<div class="list_view"></div>');
            var view = new ListView("list_view");
            var elementView = new ListElementView(view);
            expect(view.ClassUlName).toContainElement("li");
        });
    });
});
