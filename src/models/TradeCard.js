import {TagObject} from "@/models/Tag.js";

export function TradeCard(title, haveList, wantList, haveOptions, wantOptions) {
    this.id = null;
    this.title = title ?? 'My Trade Card';
    this.haveList = haveList ?? [];
    this.wantList = wantList ?? [];
    this.haveOptions = haveOptions?.length > 0
        ? haveOptions
        : TradeCard.defaultHaveOptions.map(tag => new TagObject(
            tag.title,
            tag.selected,
            [...tag.optionsArray], // Shallow copy the inner options array too
            tag.tagClass
        ));

    this.wantOptions = wantOptions?.length > 0
        ? wantOptions
        : TradeCard.defaultWantOptions.map(tag => new TagObject(
            tag.title,
            tag.selected,
            [...tag.optionsArray],
            tag.tagClass
        ));
    this.addHaveList = function(pokemon) {
        this.haveList.push(pokemon);
    }
    this.addWantedList = function (pokemon) {
        this.wantList.push(pokemon);
    }
    this.removeFromHaveList = function (pokemon) {
        this.haveList = this.haveList.filter(p => p !== pokemon);
    }
    this.removeFromWantedList = function (pokemon) {
        this.wantList = this.wantList.filter(p => p !== pokemon);
    }
    this.updateOptionClasses = function() {
        for (const option of this.wantOptions) {
            for (const subOption of option.optionsArray) {
                if (subOption.selected === option.selected) {
                    option.tagClass = subOption.tagClass;
                    break;
                }
            }
        }
        for (const option of this.haveOptions) {
            for (const subOption of option.optionsArray) {
                if (subOption.selected === option.selected) {
                    option.tagClass = subOption.tagClass;
                    break;
                }
            }
        }

    }

}

TradeCard.defaultHaveOptions = [
    new TagObject(
        'Flying Capability',
        'Cant Fly',
        [
            { selected: 'Can Fly', tagClass: 'success' },
            { selected: 'Cant Fly', tagClass: 'danger' }
        ],
        'danger'
    ),
    new TagObject(
        'Trinket Usage',
        'No Trinket',
        [
            { selected: 'No Trinket', tagClass: 'd-none' },
            { selected: 'My Trinket', tagClass: 'tertiary' }
        ],
        'd-none'
    ),
    new TagObject(
        'Pokemon Level',
        'Any Level',
        [
            { selected: 'Any Level', tagClass: 'd-none' },
            { selected: 'Level 40', tagClass: 'typewater' },
            { selected: 'Level 50', tagClass: 'typefire' }
        ],
        'd-none'
    ),
    new TagObject(
        'Guaranteed Lucky',
        'N/A',
        [
            { selected: 'N/A', tagClass: 'd-none' },
            { selected: 'Guaranteed Lucky', tagClass: 'typeelectric' }
        ],
        'd-none'
    )
];
TradeCard.defaultWantOptions = [
    new TagObject(
        'Trinket Usage',
        'No Trinket',
        [
            { selected: 'No Trinket', tagClass: 'd-none' },
            { selected: 'Your Trinket', tagClass: 'tertiary' }
        ],
        'd-none'
    ),
    new TagObject(
        'Trade Friendship',
        'Instant',
        [
            { selected: 'Instant', tagClass: 'success' },
            { selected: '7 Day Trade', tagClass: 'typeground' },
            { selected: '30 Day Trade', tagClass: 'typeground' },
            { selected: '1 Mil Dust Trade', tagClass: 'typedragon' },
            { selected: '800k Dust Trade', tagClass: 'typedragon' }
        ],
        'success'
    ),
    new TagObject(
        'Pokemon Level',
        'Any Level',
        [
            { selected: 'Any Level', tagClass: 'd-none' },
            { selected: 'Level 40', tagClass: 'typewater' },
            { selected: 'Level 50', tagClass: 'typefire' }
        ],
        'success'
    ),
    new TagObject(
        'Trade Ratio',
        '1:1',
        [
            { selected: '1:1', tagClass: 'd-none' },
            { selected: '2:1', tagClass: 'typewater' },
            { selected: '3:1', tagClass: 'typefire' }
        ],
        'success'
    ),
    new TagObject(
        'Mirror Trade',
        'N/A',
        [
            { selected: 'N/A', tagClass: 'd-none' },
            { selected: 'Mirror Trade', tagClass: 'typepoison' }
        ],
        'success'
    ),
    new TagObject(
        'Guaranteed Lucky',
        'N/A',
        [
            { selected: 'N/A', tagClass: 'd-none' },
            { selected: 'Guaranteed Lucky', tagClass: 'typeelectric' }
        ],
        'd-none'
    )
];
