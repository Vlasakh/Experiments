// ------------------------------------------
// import from utils;
const upperCase = (value, option) =>
{
    switch (option)
    {
        case 'first': {
            const [symb, ...word] = value.split('');

            return `${symb.toUpperCase()}${word.join('')}`;
        }

        case 'last': {
            return `${value.slice(0, value.length - 1)}${value.slice(-1).toUpperCase()}`;
        }
    }
};

const length = (value, option) =>
{
    if (typeof option === 'object')
    {
        const max = Math.max.apply(null, option);
        const min = Math.min.apply(null, option);

        return min <= value.length && value.length <= max;
    }
    else
    {
        return value.length <= option;
    }

};

const strip = (value, option) =>
{
    const vowels = '[aeiouy]';
    const consonants = '[bcdfghjklmnpqrstvwxz]';

    switch (option)
    {
        case 'vowels': return value.replace(new RegExp(vowels, 'gi'), '');
        default: return value.replace(new RegExp(consonants, 'gi'), '');
    }
};

// ------------------------------------------

const configs = [
    {
        upper_case: 'first',
        length: [6, 8],
    },
    {
        upper_case: 'last',
        length: [7, 9],
        strip: 'vowels',
    },
    {
        length: 10,
        strip: 'consonants',
    },
];

const words = [
    'spacejump',
    'apples',
    'graphics',
    'wordmorethanten',
];

const modificatorsMap = {
    upper_case: upperCase,
    strip,
};

const filtersMap = {
    length,
};

const processWord = (filters, modificators) => (proccWords, word) =>
{
    const filtersCheckOk = !filters.find(filter =>
        !filtersMap[filter.name](word, filter.options));

    if (!filtersCheckOk) return proccWords;

    const newWord = modificators.reduce((result, mod) =>
        modificatorsMap[mod.name](result, mod.options), word);

    return [...proccWords, newWord];
};

const processConfig = inWords => config =>
{
    const filters = Object.keys(config).reduce((res, filter) =>
        filtersMap[filter] ? [...res, { name: filter, options: config[filter] }] : res,
    []);
    const modificators = Object.keys(config).reduce((res, mod) =>
        modificatorsMap[mod] ? [...res, { name: mod, options: config[mod] }] : res,
    []);

    return inWords.reduce(processWord(filters, modificators), []);
};

function applyConfigs(inWords, inConfigs)
{
    const result = inConfigs.map(processConfig(inWords));

    return result;
}


const result = applyConfigs(words, configs);

console.log('result', result);
