var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyNameSpace;
(function (MyNameSpace) {
    var MyClass = (function () {
        function MyClass(id) {
            this.id = id;
        }
        MyClass.prototype.getId = function () {
            return this.id;
        };
        MyClass.prototype.printId = function () {
            console.log(this.id);
        };
        return MyClass;
    }());
    var Printer = (function (_super) {
        __extends(Printer, _super);
        function Printer() {
            _super.apply(this, arguments);
        }
        Printer.printOne = function () {
            console.log("10");
        };
        return Printer;
    }(MyClass));
    MyNameSpace.Printer = Printer;
})(MyNameSpace || (MyNameSpace = {}));
