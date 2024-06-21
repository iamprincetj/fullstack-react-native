export const numberPrecision = (value) => {
    if (value >= 1000) {
        const number = value / 1000;
        if (number.toString().includes('.0')) {
            return Math.floor(number);
        }
        return number.toFixed(1);
    }
    return value;
};