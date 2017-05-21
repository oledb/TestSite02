/// <reference path="../Scripts/references.ts"/>

describe("objList tests", () => {
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
        view.SaveNewBtn.trigger("click");
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