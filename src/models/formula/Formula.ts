/**
 * Model of a formula
 */
export default interface Formula {
    id: number,
    title: string
    formula: string,
    result: string | null;
    dependencies: Record<string, number>;
}