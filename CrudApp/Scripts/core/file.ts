/// <reference path="../jquerydef/index.d.ts" />

class testingo {
    public ChangeH1() {
        $("h1").html("hello world jqwerd");
    }
}

window.onload = () => { 
    var t = new testingo();
    t.ChangeH1();
}