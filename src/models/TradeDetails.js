export const TAG_KEYS = Object.freeze({
    SIZE: 'size',
    LEVEL: 'level',
    REGISTERED: 'registered',
    ELITE_TM_MOVES: 'eliteTmMoves',
    PRIORITY: 'priority',
    LUCKY: 'lucky',
    MULTI_ACCOUNT: 'multiAccount',
    POKEBALL: 'pokeball',
    GENDER: 'gender',
    TRADE_BACKGROUND: 'tradeBackground',
    QUANTITY: 'tradeQuantity',
});
//software architecture go brr
export const DEFAULT_HIDE_VALUE = 'None';

export const excludedTradeDetailsKeys = [TAG_KEYS.LUCKY, TAG_KEYS.TRADE_BACKGROUND, TAG_KEYS.QUANTITY, "image", "name"];
export function TestToExludeTag(tag ) {

        if (tag.tag !== DEFAULT_HIDE_VALUE ) {
            if (!excludedTradeDetailsKeys.includes(tag.key)) {
                return true
            }
        }

    return false


}

export const tagOptions = [
    {
        title: 'Size',
        key: TAG_KEYS.SIZE,
        optionsArray: [DEFAULT_HIDE_VALUE, 'XXL', 'XXS'],
    },
    {
        title: 'Level',
        key: TAG_KEYS.LEVEL,
        optionsArray: [DEFAULT_HIDE_VALUE, 'Lvl 1', 'Lvl 40', 'Lvl 50'],
    },
    {
        title: 'Registered',
        key: TAG_KEYS.REGISTERED,
        optionsArray: [DEFAULT_HIDE_VALUE, 'Unreg', 'Reg'],
    },
    {
        title: 'Elite TM Attacks',
        key: TAG_KEYS.ELITE_TM_MOVES,
        optionsArray: [DEFAULT_HIDE_VALUE],
    },
    {
        title: 'Quantity',
        key: TAG_KEYS.QUANTITY,
        optionsArray: [DEFAULT_HIDE_VALUE],
    },
    {
        title: 'Trade Background',
        key: TAG_KEYS.TRADE_BACKGROUND,
        optionsArray: [DEFAULT_HIDE_VALUE],
    },
    {
        title: 'Priority',
        key: TAG_KEYS.PRIORITY,
        optionsArray: [DEFAULT_HIDE_VALUE, 'Priority'],
    },
    {
        title: 'Guaranteed Lucky',
        key: TAG_KEYS.LUCKY,
        optionsArray: [DEFAULT_HIDE_VALUE, 'Lucky'],
    },
    {
        title: 'Multiple Accounts',
        key: TAG_KEYS.MULTI_ACCOUNT,
        optionsArray: [DEFAULT_HIDE_VALUE, 'Alt', 'Main'],
    },
    {
        title: 'Pokeball Type',
        key: TAG_KEYS.POKEBALL,
        optionsArray: [
            DEFAULT_HIDE_VALUE,
            'Poke Ball',
            'Ultra Ball',
            'Great Ball',
            'Premier Ball',
            'Master Ball',
            'Safari Ball',
        ],
    },
    {
        title: 'Gender',
        key: TAG_KEYS.GENDER,
        optionsArray: [DEFAULT_HIDE_VALUE, 'Male', 'Female'],
    },
];