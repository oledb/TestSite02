/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe('jquery main test', () => {
    
    it('add some text to fun class', () => {
        //arrange
        setFixtures('<div class="fun"></div>');
        //act
        var text = "Hello world text";
        $(".fun").text(text);
        //assert
        expect(".fun").toHaveText(text);
    });
});