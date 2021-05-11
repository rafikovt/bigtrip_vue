export const sortDefault = (prevPoint, nextPoint) => {
    if (prevPoint.date_from > nextPoint.date_from) {
        return 1;
    }
    return -1;
};
