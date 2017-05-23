/// <reference path="../Scripts/references.ts"/>

describe("ObjListApp", () => {
    describe("Add new element", () => {
        let view: ObjListStub;
        let controller: ObjListController;
        let model: XhrModelMock;
        beforeEach(() => {
            setFixtures(`<div id="objList"></div>`);
            view = new ObjListStub("#objList");
            model = new XhrModelMock();
            controller = new ObjListController(view, model);
        });

        it("should create a new element on addElement", () => {
            view.addElement({ id: 1, name: "test" });
            expect(view.elements.length).toEqual(1);
        });

        it("should rise addNew event on add button press", () => {
            var result = { used: false };
            view.onaddNewElement = () => { result.used = true; };
            view.pressAddNewButton();
            expect(result.used).toBeTruthy("onaddNewElement was not used");
        });

        it("should rise addNew event on press Enter in input field", () => {
            var result = { used: false };
            view.onaddNewElement = () => { result.used = true; };
            view.pressEnterInInputField();
            expect(result.used).toBeTruthy("onaddNewElement was not used");
        });

        it("should add new element to list when rised addNew event", () => {
            view.pressAddNewButton();
            expect(view.elements.length).toEqual(1);
        });

        it("should add new element using input text", () => {
            view.addTextToInputField("using input text");
            view.pressAddNewButton();
            expect(view.elements[0].objective.name).toEqual("using input text");
        });
    });
});