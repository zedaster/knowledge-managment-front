import type {RendererElement, RendererNode, VNode} from "vue"
import {h as vueH, render as vueRender} from "vue"
import type FormulaRef from "@/models/formula/FormulaRef";
import FormulaContainer from "@/components/knowledge/formula/FormulaContainer.vue";
import FormulaSelector from "@/components/knowledge/formula/FormulaSelector.vue";

/**
 * Editor.js block with a formula. It works as a plugin to support formulas
 */
export class FormulaBlock {
    // TODO: Перевести всё в editor js на русский
    // TODO: Добавить картинки

    /**
     * Raw html of icon of the tool in the menu
     * Taken from Codex icon pack https://codex.so/icons-v0-2-0
     */
    private static ICON_ELEMENT = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" ' +
        'viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ' +
        'stroke-width="2" d="M9 17C7 17 7 15.2536 7 13.5L5.5 12L7 10.5C7 8.74644 7 7 9 7"></path><path ' +
        'stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" ' +
        'd="M15 17C17 17 17 15.2536 17 13.5L18.5 12L17 10.5C17 8.74644 17 7 15 7"></path></svg>'

    /**
     * Data of the formula
     * @private
     */
    private readonly data: FormulaRef;

    /**
     * DOM wrapper of the block
     * @private
     */
    private readonly wrapper: HTMLDivElement;

    /**
     * Returns is the block in read-only mode
     * @private
     */
    private readonly isReadOnly: boolean


    constructor({data, config, api, readOnly}: { data: FormulaRef, config: object, api: object, readOnly: boolean }) {
        this.data = data
        this.wrapper = document.createElement('div')
        this.wrapper.classList.add('my-3')
        this.isReadOnly = readOnly
    }

    /**
     * Returns settings for the tool panel
     */
    static get toolbox() {
        return {
            title: 'Formula',
            icon: this.ICON_ELEMENT
        }
    }

    /**
     * Notify core that the read-only mode is supported
     *
     * @returns {boolean}
     * @public
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Renders a block. Implemented for Editor.js API.
     */
    render() {
        if (this.data && this.data.formulaId) {
            this.wrapper.appendChild(this.createFormulaContainer(this.data.formulaId));
            return this.wrapper;
        }

        const formulaSelector = this.createFormulaSelector((newId) => {
            this.data.formulaId = newId
            this.wrapper.innerHTML = '';
            this.wrapper.appendChild(this.createFormulaContainer(this.data.formulaId))
        });

        this.wrapper.appendChild(formulaSelector);
        return this.wrapper
    }

    /**
     * Returns an object that will be saved. Implemented for Editor.js API.
     */
    save() {
        return this.data
    }

    /**
     * Creates container with an existent formula
     * @param formulaId Id of the formula
     * @private
     */
    private createFormulaContainer(formulaId: number): HTMLElement {
        return this.createVueComponent(vueH(FormulaContainer, {
            formulaId: formulaId
        }))
    }

    /**
     * Creates dropdown menu to select a formula
     * @param onSelectId callback that triggers on select a new formula
     * @private
     */
    private createFormulaSelector(onSelectId: (newId: number) => void): HTMLElement {
        return this.createVueComponent(vueH(FormulaSelector, {
            'onUpdate:selectedId': onSelectId,
            'readOnly': this.isReadOnly
        }))
    }

    /**
     * Creates a DOM element from
     *
     * @param vNode virtual Vue node. Usually it creates using {@link vueH}.
     * @see https://vuejs.org/guide/extras/render-function#render-function-recipes Docs about h() and nodes in Vue
     * @private
     */
    private createVueComponent(vNode: VNode<RendererNode, RendererElement, {}>): HTMLElement {
        const container = document.createElement('div');
        vueRender(vNode, container)
        return container
    }
}