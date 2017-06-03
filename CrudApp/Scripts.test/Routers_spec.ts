/// <reference path="../Scripts/references.ts" />


describe("Routers tests", () => {
    afterEach(() => {
        $(location).attr("href", "#");
    });

    it("Should get default action if url does not contain #", () => {
        let router = new Router();
        expect(router.action !== "")
            .toBeTruthy("Router action is undefined");
        expect($(location).attr("href").split('#')[1] !== undefined)
            .toBeTruthy("Router has not default action");
    });

    it("Should set default action on create", () => {
        let router = new Router("Objectives");
        expect(router.action == "Objectives")
            .toBeTruthy("Action does not set to defaultAction");
    })

    //This is not testable because it's working correctly only with $(document).ready
    it("Should rise onactionChange if href in location changed", () => {
        let router = new Router();
        let act = "default";
        router.onactionChange = (action: string) => {
            act = action;
        }
        router.action = "Test";
        $(location).attr("href", "#Test");
        $(location).trigger("hashchange");
        expect(act).toEqual("Test");
    });
});