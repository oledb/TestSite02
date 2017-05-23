/// <reference path="../../references.ts"/>

class App {
    constructor() {
        this.Init();
    }
    private Init(): void {
        
        $(document).ready(() => {
            //this.list = new ListApp("test_list", "/api/Objective", this.error);
            this.notification = new NotificationView("notif");
            this.objListApp = new ObjListApp("#objList");
        });
    }
    public notification: NotificationView;
    public objListApp: ObjListApp;

    public error = (xhr, status, error) => {
        this.notification.ShowError("Что-то пошло не так. Операцию выполнить невозможно");
    } 

    public showError = (text: string) => {
        this.notification.ShowError(text);
    }
}