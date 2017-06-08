/// <reference path="../Scripts/references.ts" />

describe("ProjectList Tests", () => {
    let view: ProjListView;
    let controller: ProjListController;
    let model: XhrModelMock;
    beforeEach(() => {
        setFixtures(`<div id="projList"></div>`);
        view = new ProjListView("#projList");
        model = new XhrModelMock();
        controller = new ProjListController(view, model);
    });

    describe("Add new project", () => {
        it("Should create new element on ProjListView.Add");
    });
});