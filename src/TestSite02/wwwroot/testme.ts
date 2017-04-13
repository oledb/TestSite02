namespace MyNameSpace {
    abstract class MyClass {
        constructor(protected id: number) {
        }

        public getId(): number {
            return this.id;
        }

        public printId() {
            console.log(this.id);
        }
    }

    export class Printer extends MyClass {
        static printOne() {
            console.log("10");
        }
    }
}