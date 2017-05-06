/// <reference path="../../Scripts/core/IXhrModel.ts"/>

class XhrModelMock implements IXhrModel {

    public errorIndex = 0;
    public getIndex = 0;
    public postText = "no text";
    public putText = "not text";

    public error: (xhr, status, error) => void =
        (xhr, status, error) => this.errorIndex++;
    
    public Get(success: (result: any) => void) {
        this.getIndex++;
        success([
            { objectiveId: 4, name: "Test 01" },
            { objectiveId: 5, name: "Test 02" }
        ]);
    }

    public Post(value: any, success: (result) => void) {
        this.postText = value.name;
        success(0);
    }

    public Put(value: any, success: (result) => void) {
        this.putText = value.name;
    }

    public removeId = -10000;
    public Delete(id: number, success: (result) => void) {
        this.removeId = id;
    }
}