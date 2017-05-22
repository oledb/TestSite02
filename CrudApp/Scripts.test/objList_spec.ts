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
    });
    describe("objList tests with model", () => {
        let model: XhrModelMock;
        let view: ObjList;
        let controller: ObjListController;
        beforeEach(() => {
            setFixtures('<div id="objList"></div>');
            model = new XhrModelMock();
            model.setResult = () => {
                return [{ id: 1, name: "Test", status: ObjectiveStatus.New }];
            }
            view = new ObjList("#objList");
            controller = new ObjListController(view, model);
        });
        it("should use get when created", () => {
            expect(model.getIndex).toEqual(1);
        });
        it("should use post when saved new element");
        it("should use put when change the status of an element");
        it("should use put when change the name");
        it("should use delete when remove an element");
    });

    describe("objList element tests", () => {
        it("should remove from list when remove btn pressed");
        it("should remove from list when icon btn pressed");
        it("should update text when edit");
    })
});