/// <reference path="../../references.ts"/>

class NotificationView {
    constructor(public selector: string) {
        console.log("version 0");
        this.closeButton = UiDesigner.CreateButton("x", "w3-button w3-display-topright");
        this.caption = UiDesigner
            .CreateTag("h2", "w3-margin-left")
            .text("Error");
        this.textContainer = UiDesigner
            .CreateContainer()
            .text("hello");
        this.root = $(`
        <div class="w3-modal w3-animate-opacity">
            <div class="w3-modal-content w3-card-4">
                <header id="modalheader" class="w3-red ">
                </header>
                <div id="modaltextcontainer"class="w3-container w3-center w3-padding-32">
                </div>
            </div>
        </div>`).appendTo("#" + selector);
        $("#modalheader").append(this.closeButton, this.caption);
        $("#modaltextcontainer").append(this.textContainer);
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