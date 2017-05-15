/// <reference path="../../references.ts"/>

class NotificationView {
    constructor(public selector: string) {
        this.closeButton = UiDesigner.CreateButton("x", "w3-button w3-display-topright");
        this.caption = UiDesigner
            .CreateTag("h2", "w3-margin")
            .text("Error");
        this.textContainer = UiDesigner
            .CreateContainer()
            .text("hello");
        this.root = $(`
        <div class="w3-modal w3-animate-opacity">
            <div class="w3-modal-content w3-card-4">
                <header class="w3-red ">
                    ${this.closeButton[0].outerHTML}
                    ${this.caption[0].outerHTML}
                </header>
                <div class="w3-container w3-padding-32">
                    ${this.textContainer[0].outerHTML}
                </div>
            </div>
        </div>`).appendTo("#" + selector);
        this.closeButton.on("click", () => {
            console.log("click");
            this.root.hide();
        });
    }

    public ShowError(text: string): void {
        this.textContainer.text(text);
        this.root.show();
    }

    public textContainer: JQuery;
    private caption: JQuery;
    public closeButton: JQuery;
    public root: JQuery;
}