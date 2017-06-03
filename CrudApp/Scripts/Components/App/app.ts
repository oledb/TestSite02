/// <reference path="../../references.ts"/>

class App {
    constructor() {
        this.Init();
    }
    private Init(): void {
        
        $(document).ready(() => {
            this.notification = new NotificationView("notif");
            this.objListApp = new ObjListApp("#objList");
            this.router = new Router("Objectives");
            this.router.onactionChange = this.actionChanged;
        });
    }
    public notification: NotificationView;
    public objListApp: ObjListApp;
    public router: Router;

    public error = (xhr, status, error) => {
        this.notification.ShowError("Что-то пошло не так. Операцию выполнить невозможно");
    } 

    public showError = (text: string) => {
        this.notification.ShowError(text);
    }

    public actionChanged = (action: string) => {
        console.log(action);
    }
}