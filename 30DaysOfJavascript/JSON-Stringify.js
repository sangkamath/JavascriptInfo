/**
 * @param {*} value
 * @return {string}
 */
export default function jsonStringify(value) {
    if (Array.isArray(value)) {
        const arrayValues = value.map((item) => jsonStringify(item));
        return `[${arrayValues.join(',')}]`;
    }

    if (typeof value === 'object' && value !== null) {
        const objectEntries = Object.entries(value).map(
            ([key, value]) => `"${key}":${jsonStringify(value)}`,
        );
        return `{${objectEntries.join(',')}}`;
    }

    if (typeof value === 'string') {
        return `"${value}"`;
    }

    return String(value);
}

function getType(value) {
    if (value === null) {
        return 'null';
    }

    if (Array.isArray(value)) {
        return 'array';
    }

    return typeof value;
}

/**
 * @param {*} value
 * @return {string}
 */
export default function jsonStringify(value) {
    const type = getType(value);

    switch (type) {
        case 'array':
            const arrayValues = value.map((item) => jsonStringify(item)).join(',');
            return `[${arrayValues}]`;
        case 'object':
            const objectValues = Object.entries(value)
                .map(([key, value]) => `"${key}":${jsonStringify(value)}`)
                .join(',');
            return `{${objectValues}}`;
        case 'string':
            return `"${value}"`;
        default:
            // Handles null, boolean, numbers.
            return String(value);
    }
}