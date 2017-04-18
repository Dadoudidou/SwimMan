import * as assign from "object-assign";
export const immutable = {
    Array: {
        insert: <T>(array: T[], item: T, position?: number): T[] => {
            if (position == undefined) position = array.length;
            return [
                ...array.slice(0, position),
                item,
                ...array.slice(position)
            ];
        },

        remove: <T>(array: T[], matchItem: ((item: T)=>boolean)): T[] => {
            let _trouve = false;
            let _i = 0;
            while (_trouve == false && _i < array.length) {
                if (matchItem(array[_i])) _trouve = true;
                _i++;
            }
            let _index = _i - 1;
            return [
                ...array.slice(0, _index),
                ...array.slice(_index + 1)
            ];
        },

        update: <T>(array: T[], matchItem: ((item: T) => boolean), update: ((item: T, index: number) => T)): T[] => {
            return array.map((_item, index) => {
                if (!matchItem(_item)) {
                    return _item;
                }
                return assign({}, _item, update(_item, index));
            });
        },

    },

    Object: {
        update: <T>(oldObj: T, newObj: any): T => {
            return assign({}, oldObj, newObj);
        }
    }
};