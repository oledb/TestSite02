/// <reference path="../../references.ts"/>

class App {
    constructor() {
        this.Init();
    }
    private Init(): void {
        $(document).ready(() => {
            this.list = new ListApp("test_list", "/api/Objective", this.error)
        });
    }
    public list: ListApp;
    public error = function (xhr, status, error) {
        console.log(error);
    } 
}