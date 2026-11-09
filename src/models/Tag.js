/**
 * Title is the name of the tag
 * Selected is the currently selected option for the tag
 * OptionsArray is an array of all the options for the tag
 * TagClass is the class for the tag, used for styling(but doesnt have to be used)
 * @param data
 * @constructor
 */
export function TagObject(data = {}) {
    this.title = data.title ?? '';
    this.selected = data.selected ?? 'None';
    this.optionsArray = data.optionsArray ?? [];
    this.tagClass = data.tagClass;
}