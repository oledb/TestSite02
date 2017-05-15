/// <reference path="../../references.ts"/>

class App {
    constructor() {
        this.Init();
    }
    private Init(): void {
        $(document).ready(() => {
            this.list = new ListApp("test_list", "/api/Objective", this.error);
            this.notification = new NotificationView("notif");
        });
    }
    public list: ListApp;
    public notification: NotificationView;

    public error = (xhr, status, error) => {
        this.notification.ShowError("Что-то пошло не так. Операцию выполнить невозможно");
    } 
}