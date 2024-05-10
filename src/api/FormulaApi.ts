import type Formula from "@/models/formula/Formula";
import {useUserStore} from "@/store/UserStore";
import {useRouter} from "vue-router";

/**
 * API manager for formulas
 */
export class FormulaApi {
    // TODO: Remove the var when formula API is connected
    private readonly userStorage = useUserStore();

    private readonly router = useRouter();

    private static readonly defaultFormulas: Formula[] = [
        {
            id: 1,
            title: 'Mass',
            formula: 'm=500',
            result: null,
            dependencies: {}
        },
        {
            id: 2,
            title: 'Light speed',
            formula: 'c=299792458',
            result: null,
            dependencies: {}
        },
        {
            id: 3,
            title: 'Einstein theory',
            formula: 'E=mc^2',
            result: null,
            dependencies: {
                'm': 1,
                'c': 2
            }
        }
    ];

    constructor() {
        if (localStorage.getItem('formulas') == null) {
            this.saveLocalFormulas(FormulaApi.defaultFormulas)
        }
    }

    /**
     * Requests all formulas
     */
    public async getAll(): Promise<Array<Formula>> {
        this.throwIfNotAuthorized();
        return new Promise((resolve) => resolve(this.getLocalFormulas()));
    }

    /**
     * Request formula
     * @param id
     */
    public async getOneById(id: number): Promise<Formula | undefined> {
        this.throwIfNotAuthorized();
        return this.getLocalFormulas().find((f) => f.id == id);
    }

    /**
     * Requests map of id and titles of all formulas
     */
    public async getTitleMap(): Promise<Map<number, string>> {
        this.throwIfNotAuthorized()

        await new Promise(resolve => setTimeout(resolve, 500))
        const allFormulas = await this.getAll();
        const map = new Map<number, string>();
        for (const formula of allFormulas) {
            map.set(formula.id, formula.title);
        }
        return map;
    }

    /**
     * Updates formula with the same id
     * @param newFormula formula object with updated properties.
     */
    public async updateFormula(newFormula: Formula): Promise<void> {
        this.throwIfNotAuthorized();
        const formulas = this.getLocalFormulas();
        for (const i in formulas) {
            const formula = formulas[i];
            if (formula.id !== newFormula.id) {
                continue;
            }

            formulas[i] = newFormula;
            this.saveLocalFormulas(formulas);
            break;
        }
    }

    /**
     * Creates new formula using a standard template and returns value of the new formula
     */
    public async addStandardFormula(): Promise<Formula> {
        this.throwIfNotAuthorized();
        const formulas = this.getLocalFormulas();
        const maxId = this.findMaxId(formulas)
        const newFormula: Formula = {
            id: maxId + 1,
            title: 'Новая формула',
            formula: 'a=100',
            result: null,
            dependencies: {}
        };
        formulas.push(newFormula);
        this.saveLocalFormulas(formulas);
        return newFormula;
    }

    /**
     * Removes formula with a specified id
     * @param id The specified id
     */
    public async removeFormula(id: number): Promise<void> {
        this.throwIfNotAuthorized();
        const formulas = this.getLocalFormulas();
        const newFormulas = formulas.filter((f) => f.id !== id);
        this.saveLocalFormulas(newFormulas);
    }

    /**
     * Gets array of Formula object from local storage
     * @private
     */
    private getLocalFormulas(): Array<Formula> {
        return JSON.parse(localStorage.getItem('formulas') as string);
    }

    /**
     * Saves array of Formula object from local storage
     * @private
     */
    private saveLocalFormulas(formulas: Array<Formula>): void {
        localStorage.setItem('formulas', JSON.stringify(formulas))
    }

    private findMaxId(formulas: Array<Formula>) {
        let maxId = -1;
        for (const formula of formulas) {
            const id = formula.id;
            if (id > maxId) {
                maxId = id;
            }
        }
        return maxId;
    }

    private throwIfNotAuthorized() {
        // TODO: Remove the method when formula API is connected
        if (!this.userStorage.hasUser()) {
            this.router.push({name: 'login'})
            throw "Formula API: Unauthenticated"
        }
    }
}