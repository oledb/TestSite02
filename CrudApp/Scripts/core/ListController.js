var ListController = (function () {
    function ListController(View) {
        var _this = this;
        this.View = View;
        this.LastCommand = "create";
        $(this.View.InputButtonSelector)
            .on('click', function () {
            _this.AddNewElementCommand();
        });
        $(this.View.InputSelector).keypress(function (e) {
            var key = e.which;
            if (key == 13) {
                _this.AddNewElementCommand();
            }
        });
    }
    ListController.prototype.AddNewElementCommand = function () {
        this.LastCommand = "add";
        var text = $(this.View.InputSelector).val().trim();
        if (text != "") {
            this.View.Add(0, text);
        }
        $(this.View.InputSelector).val("");
    };
    return ListController;
}());
