export const defaultOptions = {
    want: [
        {
            title: 'Trinket Usage',
            text:
                'No Trinket',
            tagClass:
                'd-none',
            optionsArray:
                [
                    {text: 'No Trinket', tagClass: 'd-none'}, {text: 'Your Trinket', tagClass: 'tertiary'}
                ]
        }
        ,
        {
            title: 'Trade Friendship',
            text:
                'Instant',
            tagClass:
                'success',
            optionsArray:
                [
                    {text: 'Instant', tagClass: 'success'}, {
                    text: '7 Day Trade',
                    tagClass: 'typeground'
                }, {text: '30 Day Trade', tagClass: 'typeground'}, {
                    text: '1 Mil Dust Trade',
                    tagClass: 'typedragon'
                }, {text: '800k Dust Trade', tagClass: 'typedragon'}
                ]
        }
        ,
        {
            title: 'Pokemon Level',
            text:
                'Any Level',
            tagClass:
                'success',
            optionsArray:
                [
                    {text: 'Any Level', tagClass: 'd-none'}, {text: 'Level 40', tagClass: 'typewater'}, {
                    text: 'Level 50',
                    tagClass: 'typefire'
                }
                ]
        }
        ,
        {
            title: 'Trade Ratio',
            text:
                '1:1',
            tagClass:
                'success',
            optionsArray:
                [
                    {text: '1:1', tagClass: 'd-none'}, {text: '2:1', tagClass: 'typewater'}, {
                    text: '3:1',
                    tagClass: 'typefire'
                }
                ]
        }
        ,
        {
            title: 'Mirror Trade',
            text:
                'N/A',
            tagClass:
                'success',
            optionsArray:
                [
                    {text: 'N/A', tagClass: 'd-none'}, {text: 'Mirror Trade', tagClass: 'typepoison'}
                ]
        },

        {
            title: 'Guaranteed Lucky',
            text: 'N/A',
            tagClass: 'd-none',
            optionsArray: [
                {text: 'N/A', tagClass: 'd-none'}, {text: 'Guaranteed Lucky', tagClass: 'typeelectric'}

            ]
        }

        ]
    ,
    have: [
    {
        title: 'Flying Capability',
        text: 'Can Fly',
        tagClass: 'success',
        optionsArray: [
            {text: 'Can Fly', tagClass: 'success'}, {text: 'Cant Fly', tagClass: 'danger'}
        ]
    },
    {
        title: 'Trinket Usage',
        text: 'No Trinket',
        tagClass: 'd-none',
        optionsArray: [
            {text: 'No Trinket', tagClass: 'd-none'}, {text: 'My Trinket', tagClass: 'tertiary'}
        ]
    },
    {
        title: 'Pokemon Level',
        text: 'Any Level',
        tagClass: 'd-none',
        optionsArray: [
            {text: 'Any Level', tagClass: 'd-none'}, {text: 'Level 40', tagClass: 'typewater'}, {
                text: 'Level 50',
                tagClass: 'typefire'
            }
        ]
    },
        {
            title: 'Guaranteed Lucky',
            text: 'N/A',
            tagClass: 'd-none',
            optionsArray: [
                {text: 'N/A', tagClass: 'd-none'}, {text: 'Guaranteed Lucky', tagClass: 'typeelectric'}

            ]
        }


    ],



}

export const defaultTags = [
    {
        text: 'Size',
        Options: ['XXS', 'None', 'XXL'],
        selected: 'None'
    },

    {
        text: 'Lucky',
        Options: ['Lucky', 'None'],
        selected: 'None'
    },
    {
        text: 'Level',
        Options: ['None', 'Lvl 1', 'Lvl 40', 'Lvl 50'],
        selected: 'None'
    },
    {
        text: 'Special Move',
        Options: ['None',],
        selected: 'None'
    },
    {
        text: 'Priority',
        Options: ['None', 'Priority'],
        selected: 'None'
    },

]

