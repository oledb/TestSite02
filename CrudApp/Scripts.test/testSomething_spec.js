describe('jquery main test', function () {
    it('add some text to fun class', function () {
        var input = '<div class="fun"></div>';
        myFunction("Hello world text");
        var output = $(input).append("Hello world text")[0].outerHTML;
        expect(output === '<div class="fun">Hello world text</div>')
            .toBeTruthy("It's alway false, HAHAHA!!");
    });
});
