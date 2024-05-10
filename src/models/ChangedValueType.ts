/**
 * Replaces all types of values to single type U in object T.
 */
export type ChangedValueType<T, U> = {
    [K in keyof T]: U;
};