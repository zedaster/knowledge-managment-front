import type Formula from "@/models/formula/Formula";
import {SecureRequestManager} from "@/api/SecureRequestManager";
import config from "@/config/api.config";

/**
 * API manager for formulas
 */
export class FormulaApi {
    /**
     * Requests all formulas
     */
    public async getAll(): Promise<Array<Formula>> {
        return new SecureRequestManager().get<Array<Formula>>(config.GET_ALL_FORMULAS);
    }

    /**
     * Request formula by id
     * @param id
     */
    public async getOneById(id: number): Promise<Formula | undefined> {
        return new SecureRequestManager().get<Formula>(config.GET_FORMULA_BY_ID + id);
    }

    /**
     * Requests map of id and titles of all formulas
     */
    public async getTitleMap(): Promise<Map<number, string>> {
        const obj = await new SecureRequestManager().get<Record<number, string>>(config.GET_FORMULA_TITLE_MAP);
        const entries = Object.entries(obj)
        const entriesWithIntKeys = entries.map(e => [parseInt(e[0]), e[1]] as [number, string])
        return new Map(entriesWithIntKeys)
    }

    /**
     * Updates formula with the same id
     * @param newFormula formula object with updated properties.
     */
    public async updateFormula(newFormula: Omit<Formula, 'result'>): Promise<Formula> {
        const data = await new SecureRequestManager().put<{ result: number }>(config.UPDATE_FORMULA, newFormula)
        return {...newFormula, ...data}
    }

    /**
     * Creates new formula using a standard template and returns value of the new formula
     */
    public async addStandardFormula(): Promise<Formula> {
        const newFormula: Omit<Formula, 'result' | 'id'> = {
            title: 'Новая формула',
            formula: 'a=100',
            dependencies: {}
        };
        const data = await new SecureRequestManager().post<{
            id: number,
            result: number
        }>(config.CREATE_FORMULA, newFormula);
        return {...newFormula, ...data};
    }

    /**
     * Removes formula with a specified id
     * @param id The specified id
     */
    public async removeFormula(id: number): Promise<void> {
        await new SecureRequestManager().delete(config.DELETE_FORMULA + id);
    }
}