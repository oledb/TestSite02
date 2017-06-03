/// <reference path="../../Scripts/references.ts"/>

class RouterStub extends Router {
    public constructor(protected defaultAction: string = null,
        public actions: IAction[] = []) {
        super(defaultAction, actions);
    }

    protected setEvents() { }

    public riseHashChange(action: string) {
        this.actionName = action;
        this.hashchange();
    }
}