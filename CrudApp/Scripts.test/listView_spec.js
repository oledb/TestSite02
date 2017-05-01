describe("ListView tests", function () {
    it("should creat a new ListView in div container", function () {
        setFixtures('<div class="list_view"></div>');
        var view = new ListView("list_view");
        expect(".list_view").toContainElement("ol");
    });
});
