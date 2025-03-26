/**
 * @param {string} selector
 * @return {{css: Function}}
 */
export default function $(selector) {
    const element = document.querySelector(selector);

    return {
        /**
         * @param {string} prop
         * @param {boolean|string|number} value
         * @return {Object|void|string}
         */
        css: function (prop, value) {
            // Getter case.
            if (value === undefined) {
                // No matching elements.
                if (element == null) {
                    return undefined;
                }

                const value = element.style[prop];
                return value === '' ? undefined : value;
            }

            // Setter case.
            if (element != null) {
                element.style[prop] = value;
            }

            return this;
        },
    };
}

class jQuery {
    constructor(selector) {
        this.element = document.querySelector(selector);
    }

    css(prop, value) {
        // Getter case.
        if (value === undefined) {
            // No matching elements.
            if (this.element == null) {
                return undefined;
            }

            const value = this.element.style[prop];
            return value === '' ? undefined : value;
        }

        // Setter case.
        if (this.element != null) {
            this.element.style[prop] = value;
        }

        return this;
    }
}

export default function $(element) {
    return new jQuery(element);
}