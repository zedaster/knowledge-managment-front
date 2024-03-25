import {ComputeEngine} from "@cortex-js/compute-engine";

/**
 * Class that works with variables in dependencies of a specific formula
 */
export class DependencyVariablesService {
    /**
     * Engine that parses variables and other data from a raw formula
     * @private
     */
    private readonly computeEngine: ComputeEngine;

    constructor() {
        this.computeEngine = new ComputeEngine();
    }

    /**
     * Returns dependencies that suites for a specified formula
     * @param formula The specified formula
     * @param dependencies The map of dependencies (Record<name: string, formulaId: number>)
     */
    public getSuitableDependencies(formula: string, dependencies: Record<string, number>): Record<string, number> {
        if (Object.keys(dependencies).length == 0) {
            return {};
        }

        const formulaVariables: Set<string> = this.extractVariables(formula);
        const result: Record<string, number> = {};

        for (const dependencyKey of Object.keys(dependencies)) {
            if (formulaVariables.has(dependencyKey)) {
                result[dependencyKey] = dependencies[dependencyKey];
            }
        }

        return result;
    }

    /**
     * Returns variables that are not stated in a specified formula
     * @param formula The specified formula
     * @param warnVariables Set of variables to check
     */
    public getLostDependencies(formula: string, warnVariables: string[]): string[] {
        if (warnVariables.length == 0) {
            return [];
        }

        const lostVariables = new Array<string>();
        const formulaVariables: Set<string> = this.extractVariables(formula);

        for (const warnVar of warnVariables) {
            if (!formulaVariables.has(warnVar)) {
                lostVariables.push(warnVar);
            }
        }

        return lostVariables;
    }

    /**
     * Extracts all variables that may be replaced in a specified formula
     * @param formula The specified formula
     */
    public extractPossibleVariables(formula: string): string[] {
        return Array.from(this.extractVariables(formula));
    }

    /**
     * Extracts variables from a specified formula
     * @param formula The specified formula
     * @private
     */
    private extractVariables(formula: string): Set<string> {
        const expression = this.computeEngine.parse(formula)
        const freeVariables = expression.freeVariables;
        const result = new Set(freeVariables);
        // @ts-ignore
        if (expression.json.length > 2 && expression.json[0] === "Equal" && expression.json[1] === freeVariables[0]) {
            result.delete(freeVariables[0]);
        }
        //console.log(`Extracted vars are ${JSON.stringify(result)}`)
        return result;
    }
}