/**
 * Model of a formula
 */
export default interface Formula {
    id: number,
    title: string
    formula: string,
    result: number | null;
    dependencies: Record<string, number>;
}