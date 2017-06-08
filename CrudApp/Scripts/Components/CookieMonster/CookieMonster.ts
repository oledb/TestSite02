class CookieMonster {
    public set(name: string, object: any) {
        let temp = JSON.stringify(object);
        document.cookie = `${name}=${temp}`;
    }
    private n: number;
    public get(name: string): any {
        
    }
}