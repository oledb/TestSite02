/// <reference path="../../references.ts"/>

class App {
    constructor(public notifSelector: string = "#notification",
        public mainSelector = "#mainGrid") {
        this.Init();
    }
    private Init(): void {

        $(document).ready(() => {
            this.notification = new NotificationView(this.notifSelector);
            this.router = new Router(this.actions[0].name, this.actions);
            this.router.onactionChange = this.actionChanged;
        });
    }
    public notification: NotificationView;
    public objListApp: ObjListApp;
    public stub: StubApp;
    public router: Router;

    public error = (xhr, status, error) => {
        this.notification.ShowError("Что-то пошло не так. Операцию выполнить невозможно");
    }

    public showError = (text: string) => {
        this.notification.ShowError(text);
    }

    public actionChanged = (action: string) => {
        $(this.mainSelector).children().remove();
    }

    public actions: IAction[] = [{
        name: "Objectives",
        action: () => {
            this.objListApp = new ObjListApp(this.mainSelector);
        }
    },
    {
        name: "Projects",
        action: () => {
            this.stub = new StubApp(this.mainSelector);
        }
    }]
}