/// <reference path="../../references.ts"/>

class StubApp {
    public constructor(public selector: string) {
        $(selector).append(`<div class="animated fadeIn" 
                            style="height: 500px; background-color: #7d97a7">
            <h3 style="padding-top: 32px; color: white; margin: auto; display: table">
                This article under construction</h3>
        </div>`);
    }
}