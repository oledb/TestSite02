/// <reference path="../references.ts"/>

class XhrModel implements IXhrModel {
    constructor(protected Url: string, public error: (xhr, status, error) => void) {
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