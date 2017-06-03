class Router {
    public constructor(private defaultAction: string = null,
                       public actions: IAction[] = []) {
        if (this.defaultAction == null)
            this.defaultAction = "default";
        this.action = this.defaultAction;
        
        $(window).on("hashchange", () => {
            if (typeof this.onactionChange === "function")
                this.onactionChange(this.action);
        });
    }

    public get action(): string {
        let temp = $(location).attr("href").split('#')[1];
        return temp === undefined ? "" : temp;
    }

    public set action(value: string){
        $(location).attr("href", "#" + value);
    }

    public onactionChange: (action: string) => void;

    public runAction(name: string) {

    }
}

interface IAction {
    name: string;
    action: () => void;
}