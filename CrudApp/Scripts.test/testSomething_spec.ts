/// <reference path="../Scripts/core/ListView.ts"/>
/// <reference path="../node_modules/@types/jquery/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine/index.d.ts"/>
/// <reference path="../node_modules/@types/jasmine-jquery/index.d.ts"/>

describe('jquery main test', () => {
    
    it('add some text to fun class', () => {
        let input = '<div class="fun"></div>';
        myFunction("Hello world text");
        let output = $(input).append("Hello world text")[0].outerHTML;
        expect(output === '<div class="fun">Hello world text</div>')
            .toBeTruthy("It's alway false, HAHAHA!!");
    });
});