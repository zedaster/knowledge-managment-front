import type Formula from "@/models/formula/Formula";

/**
 * Class that figures out possible dependency formulas for a specific formula
 */
export class DependencyOptionsService {
    /**
     * Figures out possible dependency formulas for a specific formula
     * @param formula specific formula
     * @param allFormulas all formulas
     */
    getPossibleDependencies(formula: Formula, allFormulas: Array<Formula>): Array<Formula> {
        return allFormulas.filter(f => f.id !== formula.id);
    }
}