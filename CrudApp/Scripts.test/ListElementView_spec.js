describe("ListElementView tests", function () {
    it("should create an elementView ", function () {
        setFixtures('<div class="list_view"></div>');
        var view = new ListView("list_view");
        var elementView = new ListElementView(view, 0);
        expect(view.UlSelector).toContainElement("li");
    });
});
