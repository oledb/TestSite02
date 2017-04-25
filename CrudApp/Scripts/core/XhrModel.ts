/// <reference path="../jquerydef/index.d.ts"/>

class XhrModel {
    constructor(protected Url: string, protected error: () => void) {
    }
    private readonly timeout = 5000;
    public Get(success: (result) => void) {
        $.ajax({
            type: 'get',
            url: this.Url,
            success: success,
            error: this.error,
            timeout: this.timeout
        });
    }

    public Post(value: any, success: (result) => void) {
        $.ajax({
            type: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: this.Url,
            success: success,
            error: this.error,
            data: JSON.stringify(value),
            dataType: "json",
            timeout: this.timeout
        });
    }
}

$("window").ready(() => {
    var t = new XhrModel("/api/Objective", () => {
        console.log("Cannot execute request!!!");
    });
    t.Post({ Name: "Test task 007" }, () => {
        console.log("Post success");
    });
    t.Get((rslt) => {
        console.log("get query");
        console.log(rslt);
    });
});