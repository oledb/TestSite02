/// <reference path="../Scripts/references.ts"/>

describe("ObjListApp", () => {
    let view: ObjListStub;
    let controller: ObjListController;
    let model: XhrModelMock;
    beforeEach(() => {
        setFixtures(`<div id="objList"></div>`);
        view = new ObjListStub("#objList");
        model = new XhrModelMock();
        controller = new ObjListController(view, model);
    });

    describe("Adding new elements", () => {
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

        it("should using model.post when added new element", () => {
            view.addTextToInputField("using model.post");
            view.pressAddNewButton();
            expect(model.postText).toEqual("using model.post");
        })

        it("should clear input field if adding was success", () => {
            view.addTextToInputField("using model.post");
            view.pressAddNewButton();
            expect(view.inputText).toEqual("");
        });
    });
    describe("Loading exist elements", () => {
        it("should load elements from model when controller is creating", () => {
            model = new XhrModelMock();
            model.setResultForGet = () => { return [{ id: 1, name: "Hello" }] };
            controller = new ObjListController(view, model);

            expect(view.elements.length).toEqual(1);
        });
    });
    describe("Editing element", () => {
        it("should update element on element.update", () => {
            let obj = { id: 2, name: "test", status: ObjectiveStatus.New };
            let element = new ObjListElement(obj);
            element.update({ name: "updated", status: ObjectiveStatus.Completed });

            expect(element.text).toEqual("updated");
            expect(element.objective.status).toEqual(ObjectiveStatus.Completed);
        });

        it("should rising update event when save button pressed", () => {
            var result = { used: false };
            let element = view.addStubElement("Test");
            element.onupdate = () => { result.used = true; };
            element.triggerSaveBtn();
            expect(result.used).toBeTruthy("Update was not rised")
        })
    });
});