/// <reference path="../Scripts/references.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListElementView tests", () => {
    let view: ListView;
    let elementView: ListElementView;
    beforeEach(() => {
        setFixtures('<div class="list_view"></div>');
        view = new ListView("list_view");
        view.Add(0, "TestText");
        elementView = view.Items[0];
    });

    it("should have invisible Remove button", () => {
        expect(elementView.root).toContainElement("div > button");
        expect(elementView.buttonsContainer).toHaveCss({ display: "none" });
        expect(elementView.buttonsContainer).toContainElement("button");
        expect(elementView.removeButton).toHaveText("Remove");
        expect(elementView.editButton).toHaveText("Edit");
        expect(elementView.saveButton).toHaveCss({ display: "none" });
    });

    it("should show the Remove button when mouse is over", () => {
        elementView.root.trigger("mouseover");
        expect(elementView.buttonsContainer).not.toHaveCss({ display: "none" });
    });

    it("should hide the Remove button when mouse is out", () => {
        elementView.root.trigger("mouseover");
        elementView.root.trigger("mouseout");
        expect(elementView.buttonsContainer).toHaveCss({ display: "none" });
    });

    it("should go to editable mode on edit", () => {
        elementView.Edit();
        expect(elementView.saveButton).not.toHaveCss({ display: "none" });
        expect(elementView.editButton).toHaveCss({ display: "none" });
        expect(elementView.removeButton).toHaveCss({ display: "none" });
        expect(elementView.editInput != undefined).toBeTruthy("EditInput is undefined");
        expect(elementView.editInput).toHaveValue(elementView.Text);
    });

    it("should go to standard mode on save", () => {
        elementView.Edit();
        elementView.Save();
        expect(elementView.saveButton).toHaveCss({ display: "none" });
        expect(elementView.editButton).not.toHaveCss({ display: "none" });
        expect(elementView.removeButton).not.toHaveCss({ display: "none" });
        expect(elementView.editInput == undefined).toBeTruthy("EditInput is exist");
        expect(elementView.textContainer).toHaveText(elementView.Text);
    });

    it("should update text value when save", () => {
        elementView.Edit();
        elementView.editInput.val("this is edited text");
        elementView.Save();
        expect(elementView.textContainer).toHaveText("this is edited text");
    });

    it("should disable animation for buttonsContainers when editMode", () => {
        elementView.root.trigger("mouseover");
        elementView.Edit();
        elementView.root.trigger("mouseout");
        expect(elementView.buttonsContainer).not.toHaveCss({ display: "none" });
    });
});