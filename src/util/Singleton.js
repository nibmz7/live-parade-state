export default class Singleton {
    static getInstance() {
        if (!this.instance) this.instance = new this();
        return this.instance;
    }
}