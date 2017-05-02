var ListController = (function () {
    function ListController(View) {
        var _this = this;
        this.View = View;
        this.LastCommand = "create";
        $(this.View.InputButtonSelector)
            .on('click', function () {
            _this.AddNewElementCommand();
        });
    }
    ListController.prototype.AddNewElementCommand = function () {
        this.LastCommand = "add";
        var text = $(this.View.InputSelector).val();
        console.log(text);
        this.View.Add(0, text);
    };
    return ListController;
}());
