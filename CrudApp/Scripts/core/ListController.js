var ListController = (function () {
    function ListController(View, model) {
        this.View = View;
        this.model = model;
        this.LastCommand = "create";
        this.SetEventsToAddButton();
        if (model != undefined) {
            this.GetAllElements();
        }
    }
    ListController.prototype.GetAllElements = function () {
        var _this = this;
        this.model.Get(function (result) {
            for (var _i = 0, _a = result; _i < _a.length; _i++) {
                var obj = _a[_i];
                _this.View.Add(obj.ObjectiveId, obj.Name);
            }
        });
    };
    ListController.prototype.AddNewElementCommand = function () {
        var _this = this;
        this.LastCommand = "add";
        var text = $(this.View.input).val().trim();
        if (text != "") {
            if (this.model != undefined) {
                this.model.Post(text, function (result) {
                    _this.View.Add(result.ObjectiveId, result.Name);
                });
            }
            this.View.Add(0, text);
        }
        $(this.View.input).val("");
    };
    ListController.prototype.SetEventsToAddButton = function () {
        var _this = this;
        $(this.View.inputAddButton)
            .on('click', function () {
            _this.AddNewElementCommand();
        });
        $(this.View.input).keypress(function (e) {
            var key = e.which;
            if (key == 13) {
                _this.AddNewElementCommand();
            }
        });
    };
    return ListController;
}());
