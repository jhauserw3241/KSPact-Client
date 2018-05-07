import { isInList } from './List';

export function filterByName(event, list, handleSuccess) {
    var updatedList = [];
    updatedList = list.filter(item =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
    handleSuccess(updatedList);
}

export function filterByGrade(list, event, grade, handleSuccess) {
    var updatedList = [];
    updatedList = list.filter(item =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
    handleSuccess(updatedList);
}