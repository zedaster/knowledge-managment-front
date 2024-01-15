import type {FormulaAddElement, TextAddElement} from "@/service/edit/AddElement";
import {isFormulaAddElement, isTextAddElement} from "@/service/edit/AddElement";
import {SpaceCleanService} from "@/service/SpaceCleanService";

export class EditorService {
    public compileContent(elements: Array<FormulaAddElement | TextAddElement>): string {
        const codedContents = []
        for (const content of elements) {
            if (isTextAddElement(content)) {
                codedContents.push(`<p>${new SpaceCleanService().trimAndFormatMultiSpaces(content.text)}</p>`)
            } else if (isFormulaAddElement(content)) {
                codedContents.push(`<FormulaContainer formula-id="${content.formulaId}" />`)
            }
        }
        return codedContents.join("")
    }

    public decompileContent(content: string): Array<FormulaAddElement | TextAddElement> {
        const regex = /<(p)>([^<]*)<\/p>|<(FormulaContainer) formula-id="(\d+)" \/>/g
        const result = [];
        let match = regex.exec(content);
        while (match != null) {
            if (match[1] === "p") {
                result.push({text: match[2]} as TextAddElement)
            } else if (match[3] === 'FormulaContainer') {
                result.push({formulaId: Number.parseInt(match[4])} as FormulaAddElement)
            }
            match = regex.exec(content);
        }
        return result;
    }
}