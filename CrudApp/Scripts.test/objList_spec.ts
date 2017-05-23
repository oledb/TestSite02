/// <reference path="../Scripts/references.ts"/>

describe("ObjList test", () => {
    describe("objList view test", () => {
        let view: ObjList;
        var isSaved: boolean;
        let pressEnter: JQueryEventObject;

        beforeAll(() => {
            let keypress = $.Event("keypress")
            keypress.which = 13;
            pressEnter = keypress;
        });

        beforeEach(() => {
            setFixtures('<div id="objList"></div>');
            isSaved = false;
            view = new ObjList("objList");
            view.eventAddNewElement = () => { isSaved = true; };
        });

        it("should rise save event on save input button click", () => {
            view.SaveNewBtn.trigger("mousedown");
            expect(isSaved).toBeTruthy("save event is not verified on click saveBtn");
        });

        it("should rise save event on enter key pressed in input", () => {
            view.newElementInput.trigger(pressEnter);
            expect(isSaved).toBeTruthy("save event is not verified on Enter pressed in the input");
        });

        it("should add new elemetn on addElement", () => {
            let obj: IObjective = { id: 1, name: "Test" };
            view.addElement(obj);
            expect(view.elements.length).toEqual(1);
            expect(view.root).toContainElement("li.ov-element");
        });

        it("should remove element on removeElement", () => {
            view.addElement({ id: 5, name: "test" });
            view.removeElement({ id: 5, name: "" });
            expect(view.elements.length).toEqual(0);
        })
    });

    describe("objList tests with model", () => {
        let model: XhrModelMock;
        let view: ObjListStub;
        let controller: ObjListController;
        beforeEach(() => {
            setFixtures('<div id="objList"></div>');
            model = new XhrModelMock();
            model.setResult = () => {
                return [{ id: 1, name: "Test", status: ObjectiveStatus.New }];
            }
            view = new ObjListStub("#objList");
            controller = new ObjListController(view, model);
        });
        it("should use get when created", () => {
            expect(model.getIndex).toEqual(1);
        });
        it("should use post when saved new element", () => {
            view.triggerEventAddNewElement("Test post task");
            expect(model.postText).toEqual("Test post task");
        });
        it("should use put when change the status of an element", () => {
            view.triggerEvenetCompleteElement();
            let obj = <IObjective>model.putValue;
            expect(obj.status == ObjectiveStatus.Completed).toBeTruthy("value is not IObjective");

        });
        it("should use put when change the name");
        it("should use delete when remove an element");
    });

    describe("objListElement tests", () => {
        let model: XhrModelMock;
        let view: ObjListStub;
        let controller: ObjListController;
        beforeEach(() => {
            setFixtures('<div id="objList"></div>');
            model = new XhrModelMock();
            model.setResult = () => {
                return [{ id: 1, name: "Test", status: ObjectiveStatus.New }];
            }
            view = new ObjListStub("#objList");
            controller = new ObjListController(view, model);
        });
        it("should remove an element from list when the element is completed", () => {
            view.triggerEvenetCompleteElement();
            expect(view.elements.length).toEqual(0);
        });
        it("should remove from list when remove btn pressed");
        it("should update text on save editting", () => {
            view.triggerEventUpdateTextElement("Updated text");
            expect(view.elements[0].text).toEqual("Updated text");
        });
    })
});