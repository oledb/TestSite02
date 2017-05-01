/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe("ListView tests", () => {
    it("should creat a new ListView in div container", () => {
        setFixtures('<div class="list_view"></div>')

        let view = new ListView("list_view");

        expect(".list_view").toContainElement("ol");
    });
});