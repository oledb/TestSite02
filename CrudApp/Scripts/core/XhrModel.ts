/// <reference path="../jquerydef/index.d.ts"/>

class XhrModel {
    constructor(protected Url: string) {
    }
    public Get(success: (result) => void) {
        $.ajax({
            url: this.Url,
            success: success
        });
    }
}

$("window").ready(() => {
    var t = new XhrModel("/api/Objective");
    t.Get((rslt) => {
        console.log("get query");
        console.log(rslt);
    });
});