export type FormulaAddElement = {
    formulaId: number
}

export function isFormulaAddElement(o: any): o is FormulaAddElement {
    return typeof o.formulaId === 'number'
}

export type TextAddElement = {
    text: string
}

export function isTextAddElement(o: any): o is TextAddElement {
    return typeof o.text === 'string'
}