export { default as Nestable } from "./Nestable";

interface IOptions {
    callback?: (mainContainer, element) => void
    onDragStart?: (mainContainer, element) => void
    beforeDragStop?: (mainContainer, element, place) => void
    rootClass?: string
    listClass?: string
    itemClass?: string
    dragClass?: string
    noDragClass?: string
    handleClass?: string
    collapsedClass?: string
    noChildrenClass?: string
    placeClass?: string 
    emptyClass?: string
    maxDepth?: number
    group?: number
    scroll?: boolean
    scrollSensitivity?: number
    scrollSpeed?: number
    scrollTriggers?: { top: number, left: number, right: number, bottom: number }
    contentCallback?: (item: any) => string
    listNodeName?: string
    itemNodeName?: string
    expandBtnHTML?: string
    collapseBtnHTML?: string
    includeContent?: boolean
    listRenderer?: () => void
    itemRenderer?: () => void
    json?: string
}

declare global {
    interface JQuery {
        nestable(option: IOptions): void

        nestable(method: "serialize"): any[]

        nestable(method: "toArray"): {depth: number, id: number, left: number, parent_id:number, right: number}[]
    }
}