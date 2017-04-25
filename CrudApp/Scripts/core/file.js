var Testingo = (function () {
    function Testingo() {
    }
    Testingo.prototype.ChangeH1 = function () {
        $("h1").text("Hello, it's the Testingo class");
    };
    return Testingo;
}());
