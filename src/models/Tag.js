export function TagObject(title, selected, optionsArray, tagClass) {
    this.title = title ?? '';
    this.selected = selected ?? 'None';
    this.optionsArray = optionsArray ?? [];
    this.tagClass = tagClass;
    this.test = function() {
        console.log('test')
    }
}