/// <reference path="../jquerydef/index.d.ts"/>

class Testingo {
    public ChangeH1() {
        $("h1").text("Hello, it's the Testingo class");
    }
}

window.onload = () => {
    var t = new Testingo();
    t.ChangeH1();
}