export function TagObject(data = {}) {
    this.title = data.title ?? '';
    this.selected = data.selected ?? 'None';
    this.optionsArray = data.optionsArray ?? [];
    this.tagClass = data.tagClass;
    this.test = function() {
        console.log('test')
    }
}