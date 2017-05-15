/// <reference path="../Scripts/references.ts"/>

describe("NotificationView tests", () => {
    let view: NotificationView;
    let baseSelector = "#notifications";
    beforeEach(() => {
        setFixtures('<div id="notifications"></div>');
        view = new NotificationView("notifications");
    })

    it("Should create modal when create view", () => {
        expect(baseSelector).toContainElement("div.w3-modal");
        expect(baseSelector).toContainElement("div.w3-modal > div.w3-modal-content");
        expect("div.w3-modal-content > header").toContainElement("button");
    });
    
    it("Should show modal when used ShowError", () => {
        view.ShowError("Ops, something wrong!");
        expect(".w3-modal").not.toHaveCss({ display: "none" });
        expect(view.textContainer).toHaveText("Ops, something wrong!");
    });

    it("Should hide modal when close button pressed", () => {
        view.root.show();
        view.closeButton.trigger("click");
        expect(view.root).toHaveCss({ display: "none" });
    });
});