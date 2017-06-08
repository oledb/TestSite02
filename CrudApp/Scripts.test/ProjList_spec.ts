/// <reference path="../Scripts/references.ts" />

describe("ProjectListApp", () => {
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
        it("Should create new element on ProjListView.Add", () => {
            view.addElement({ id: 1, name: "Test" });
            expect(view.elements.length).toEqual(1);
        });

        it("Should rise addnewElement event on add new button pressed");
    });
});