class Router {
    public constructor(protected defaultActionName: string = null,
                       public actions: IAction[] = []) {
        if (this.defaultActionName == null)
            this.defaultActionName = "default";
        this.actionName = this.defaultActionName;
        this.setEvents();
        this.runAction(this.defaultActionName);
    }

    protected setEvents() {
        $(window).on("hashchange", this.hashchange);
    }

    protected hashchange = () => {
        let name = this.actionName;
        if (typeof this.onactionChange === "function")
            this.onactionChange(name);
        this.runAction(name);
    }

    public get actionName(): string {
        let temp = $(location).attr("href").split('#')[1];
        return temp === undefined ? "" : temp;
    }

    public set actionName(value: string){
        $(location).attr("href", "#" + value);
    }

    public onactionChange: (action: string) => void;

    private runAction(name: string) {
        for (let element of this.actions) {
            if (element.name.toUpperCase() === name.toUpperCase()) {
                element.action();
            }
        }
    }
}

interface IAction {
    name: string;
    action: () => void;
}