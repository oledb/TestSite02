describe('jquery main test', function () {
    it('add some text to fun class', function () {
        setFixtures('<div class="fun"></div>');
        var text = "Hello world text";
        $(".fun").text(text);
        expect(".fun").toHaveText(text);
    });
});
