export const sortDefault = (prevPoint, nextPoint) => {
    if (prevPoint.date_from > nextPoint.date_from) {
        return 1;
    }
    return -1;
}

export const sortPriceDown = (prevPoint, nextPoint) => nextPoint.base_price - prevPoint.base_price;
export const sortTimeDown = (prevPoint, nextPoint) => {
    return (nextPoint.date_to - nextPoint.date_from) - (prevPoint.date_to - prevPoint.date_from);
};
