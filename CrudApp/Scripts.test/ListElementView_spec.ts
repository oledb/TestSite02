/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../Scripts/core/ListElementView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListElementView tests", () => {
    beforeEach(() => {
        setFixtures('<div class="list_view"></div>');
    });

    it("should create an elementView ", () => {
        let view = new ListView("list_view");
        let elementView = new ListElementView(view, 0);

        expect(view.root).toContainElement(`li, #${elementView.LiId}`);
    });

    it("should have invisible Remove button", () => {
        let view = new ListView("list_view");
        view.Add(0, "TestText");
        let elementView = view.Items[0];

        expect(elementView.root).toContainElement("div > button");
        expect(elementView.buttonsContainer).toHaveCss({ display: "none" });
    });

    it("should show the Remove button when mouse is over", () => {
        let view = new ListView("list_view");
        view.Add(0, "TestText");
        let elementView = view.Items[0];

        elementView.root.trigger("mouseover");
        expect(elementView.buttonsContainer).not.toHaveCss({ display: "none" });
    });

    it("should hide the Remove button when mouse is out", () => {
        let view = new ListView("list_view");
        view.Add(0, "TestText");
        let elementView = view.Items[0];

        elementView.root.trigger("mouseover");
        elementView.root.trigger("mouseout");
        expect(elementView.buttonsContainer).toHaveCss({ display: "none" });
    });
});