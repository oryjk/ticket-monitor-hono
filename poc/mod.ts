export const counter = {
    count: 0,
    increment() {
        this.count++;
        return this.count;
    }
}