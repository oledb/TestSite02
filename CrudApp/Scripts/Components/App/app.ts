/// <reference path="../../references.ts"/>

class App {
    constructor() {
        this.Init();
    }
    private Init(): void {
        
        $(document).ready(() => {
            //this.list = new ListApp("test_list", "/api/Objective", this.error);
            this.notification = new NotificationView("notif");
            this.objList = new ObjList("#objList", this.showError);
            this.objList.addElement({ id: 1, name: "Test" });
            this.objList.addElement({ id: 2, name: "Test 2" });
            this.objList.addElement({ id: 3, name: "Test 3" });
            
        });
    }
    public list: ListApp;
    public notification: NotificationView;
    public objList: ObjList;

    public error = (xhr, status, error) => {
        this.notification.ShowError("Что-то пошло не так. Операцию выполнить невозможно");
    } 

    public showError = (text: string) => {
        this.notification.ShowError(text);
    }
}