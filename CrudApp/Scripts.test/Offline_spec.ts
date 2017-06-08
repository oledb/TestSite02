/// <reference path="../Scripts/references.ts" />

describe("Offline mode", () => {
    let cookie: CookieMonster;
    beforeEach(() => {
        cookie = new CookieMonster();
    });
    afterEach(() => {
        document.cookie = "";
    })
    describe("Get, Set, Clear cookie", () => {
        it("Should set JSON to cookie", () => {
            cookie.set("Object", { name: "Test", number: 42 });
            expect(document.cookie.indexOf("Object")).toBeGreaterThanOrEqual(0);
        });

        //it("Should get JSON from cookie", () => {
        //    document.cookie = `Something=12; Object={name: "Test", number: 42}`;
        //    let result = cookie.get("Object");
        //    expect(result.name).toEqual("Test");
        //    expect(result.number).toEqual(42);
        //})
    });
});