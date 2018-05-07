export function isInList(item, list) {
    for(var index in list) {
        var element = list[index];

        if(element === item) {
            return true;
        }
    }

    return false;
}

export function oneOrMoreMatches(subset, list) {
    console.log(subset);
    console.log(list);
    for(var item in list) {
        console.log("List", item);
        for(var sitem in subset) {
            console.log("Subset", sitem);
            console.log("comp", item === sitem)
            if(item === sitem) {
                return true;
            }
        }
    }

    return false;
}