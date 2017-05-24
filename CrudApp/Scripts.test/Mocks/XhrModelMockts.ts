/// <reference path="../../Scripts/references.ts"/>

class XhrModelMock implements IXhrModel {

    public errorIndex = 0;
    public getIndex = 0;
    public postText = "no text";
    public putText = "not text";
    public putValue: any;

    public error: (xhr, status, error) => void =
        (xhr, status, error) => this.errorIndex++;

    public setResultForGet: () => any;
    public Get(success: (result: any) => void) {
        this.getIndex++;
        let result;
        if (this.setResultForGet !== undefined)
            result = this.setResultForGet();
        else
            result = [];
        success(result);
    }

    public Post(value: any, success: (result) => void) {
        this.postText = value.name;
        success(0);
    }

    public Put(value: any, success: (result) => void) {
        this.putText = value.name;
        this.putValue = value;
        success(null);
    }

    public removeId = -10000;
    public Delete(id: number, success: (result) => void) {
        this.removeId = id;
    }
}