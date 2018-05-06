export function isInList(item, list) {
    for(var index in list) {
        var element = list[index];

        if(element === item) {
            return true;
        }
    }

    return false;
}