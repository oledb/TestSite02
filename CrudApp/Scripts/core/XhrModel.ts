/// <reference path="../jquerydef/index.d.ts"/>

class XhrModel {
    constructor(protected Url: string, protected error: (xhr, status, error) => void) {
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

    public Put(value: any, success: (result) => void){
        $.ajax({
            type: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: this.Url,
            success: success,
            error: this.error,
            data: JSON.stringify(value),
            timeout: this.timeout
        });
    }

    public Delete(id: number, success: (result) => void) {
        $.ajax({
            type: 'delete',
            url: this.Url + "/" + id.toString(),
            success: success,
            error: this.error,
            timeout: this.timeout
        });
    }
}

$("window").ready(() => {
    var t = new XhrModel("/api/Objective", (xhr, status, error) => {
        console.log("Cannot execute request!!!");
        console.log(xhr);
        console.log(status);
        console.log(error);
    });
    t.Delete(0, () => {
        console.log("Delete success");
        t.Get((rslt) => {
            console.log("get query");
            console.log(rslt);
        });
    });
});