﻿/// <reference path="../../Scripts/core/IXhrModel.ts"/>

class XhrModelMock implements IXhrModel {

    public errorIndex: number = 0;
    public getIndex: number = 0;
    public postIndex: number = 0;
    public postText: string = "no text";

    public error: (xhr, status, error) => void =
        (xhr, status, error) => this.errorIndex++;
    
    public Get(success: (result: any) => void) {
        this.getIndex++;
        success([
            { ObjectiveId: 4, Name: "Test 01" },
            { ObjectiveId: 5, Name: "Test 02" }
        ]);
    }

    public Post(value: any, success: (result) => void) {
        this.postIndex++;
        this.postText = value;
    }

    public Put(value: any, success: (result) => void) {

    }

    public Delete(id: number, success: (result) => void) {

    }
}