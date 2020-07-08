export declare enum Operations {
    AND = 0,
    OR = 1
}
export default interface FilterItem {
    field: string;
    value?: string;
    operation?: Operations;
}
