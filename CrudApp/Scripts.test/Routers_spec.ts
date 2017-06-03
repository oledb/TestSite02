/// <reference path="../Scripts/references.ts" />


describe("Routers tests", () => {
    afterEach(() => {
        $(location).attr("href", "#");
    });

    it("Should get default actionName if url does not contain #", () => {
        let router = new Router();
        expect(router.actionName !== "")
            .toBeTruthy("Router action is undefined");
        expect($(location).attr("href").split('#')[1] !== undefined)
            .toBeTruthy("Router has not default action");
    });

    it("Should set default action on create", () => {
        let router = new Router("Objectives");
        expect(router.actionName == "Objectives")
            .toBeTruthy("Action does not set to defaultAction");
    })

    it("Should run onactionChange when change action", () => {
        let act = "default";
        let router = new RouterStub();
        router.onactionChange = (action: string) => {
            act = action;
        };
        router.riseHashChange("Test");
        expect(act).toEqual("Test");
    });

    it("Should run action when actionName change", () => {
        let wasRunning = false;
        let action: IAction = {
            name: "test", action: () => {
                wasRunning = true;
            }
        }
        let router = new RouterStub("default", [action]);
        router.riseHashChange("Test");
        expect(wasRunning).toBeTruthy("test action was running");
    });

    it("Should run default action on create", () => {
        let wasRunning = false;
        let action: IAction = {
            name: "default", action: () => {
                wasRunning = true;
            }
        }
        let router = new RouterStub("default", [action]);
        expect(wasRunning).toBeTruthy("test action was running");
    });
});