﻿/// <reference path="../Scripts/references.ts"/>

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

        it("should add new element using input text", () => {
            view.addTextToInputField("using input text");
            view.pressAddNewButton();
            expect(view.elements[0].objective.name).toEqual("using input text");
        });

        it("New element should have a new status after creating", () => {
            view.addTextToInputField("new status");
            view.pressAddNewButton();
            expect(view.elements[0].objective.status).toEqual(ObjectiveStatus.New);
        });

        it("should not create new element if input field is empty", () => {
            view.addTextToInputField("");
            view.pressAddNewButton();
            expect(view.elements.length).toEqual(0);
        });

        it("should using model.post when added new element", () => {
            view.addTextToInputField("using model.post");
            view.pressAddNewButton();
            expect(model.postText).toEqual("using model.post");
        });

        it("should not create new element if input field contains spaces", () => {
            view.addTextToInputField("        ");
            view.pressAddNewButton();
            expect(view.elements.length).toEqual(0);
        });

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
            element.pressSaveBtn();
            expect(result.used).toBeTruthy("Update was not rised")
        });

        it("should update element if changeStatus buttons were pressed", () => {
            let element = view.addStubElement("Test");
            element.pressWipButton();
            expect(element.status).toEqual(ObjectiveStatus.WorkInProgress);
            element.pressCancelButton();
            expect(element.status).toEqual(ObjectiveStatus.Cancel);
            element.pressWaitButton();
            expect(element.status).toEqual(ObjectiveStatus.Waiting);
            element.pressNewButton();
            expect(element.status).toEqual(ObjectiveStatus.New);
        });

        it("should used model.post when element was be updated", () => {
            let element = view.addStubElement("Test task");
            element.triggerEditModeOnAndInputText("used model.post");
            element.pressSaveBtn();
            let result = <IObjective>model.putValue;
            expect(result.name).toEqual("used model.post");
            expect(element.text).toEqual("used model.post");
        });

        it("shuld used model.post when status was changed", () => {
            let element = view.addStubElement("Test task");
            element.pressWaitButton();
            let result = <IObjective>model.putValue;
            expect(result.status).toEqual(ObjectiveStatus.Waiting);
        })
    });
    describe("Removing element", () => {
        it("should remove element when view used removeElement", () => {
            view.addStubElement("temp");
            view.removeElement(view.elements[0].objective);
            expect(view.elements.length).toEqual(0);
        });

        it("should rise remove event when remove button pressed", () => {
            let result = { used: false }
            let element = view.addStubElement("Test task");
            element.onremove = (e, o) => {
                result.used = true;
            }
            element.pressRemoveButton();
            expect(result.used).toBeTruthy("remove event was not used");
        });

        it("should remove element from list when remove button pressed", () => {
            let element = view.addStubElement("Test task");
            element.pressRemoveButton();
            expect(view.elements.length).toEqual(0);
        });

        it("should rise complete event when icon pressed", () => {
            let result = { used: false }
            let element = view.addStubElement("Test task");
            element.oncomplete = (e, o) => {
                result.used = true;
            };
            element.pressIconButton();
            expect(result.used).toBeTruthy("oncomplete was not used");
        });

        it("should completed and remove element when icon pressed", () => {
            let element = view.addStubElement("Test task");
            element.pressIconButton();
            expect(view.elements.length).toEqual(0);
        });

        it("should use model.put when complete element", () => {
            let element = view.addStubElement("use model.put when complete element");
            element.pressIconButton();
            let result = <IObjective>model.putValue
            expect(result.name).toEqual(element.objective.name);
            expect(result.status).toEqual(ObjectiveStatus.Completed);
        });
    });
});