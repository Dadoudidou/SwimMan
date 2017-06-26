import * as React from "react";

interface IDraggableProps {
    enabled?: boolean
    onDragStart?: (x: number, y: number, ev: MouseEvent) => void
    onDragEnd?: (x: number, y: number, ev: MouseEvent) => void
    onDragging?: (x: number, y: number, ev: MouseEvent) => void
}

interface IDraggableState {
}

class Draggable extends React.PureComponent<IDraggableProps, IDraggableState>
{
    // set the default props for the class
    static defaultProps: IDraggableProps = {
        enabled: true,
        onDragEnd: () => { },
        onDragStart: () => { },
        onDragging: () => { }
    }

    _mouseDown: boolean = false;
    _mousePosX: number = 0;
    _mousePosY: number = 0;

    constructor(props: IDraggableProps) {
        super(props);
        this.state = {};
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseHover = this.mouseHover.bind(this);
    }

    refs: {
        [key: string]: any,
        dragContainer: HTMLDivElement
    }

    //#region LIFECYCLE

    // invoked immediately before mounting occurs
    componentWillMount() { }

    // invoked immediately after a component is mounted
    componentDidMount() {
        window.addEventListener("mouseup", this.mouseUp, false);
        this.refs.dragContainer.addEventListener("mousedown", this.mouseDown, false);
        this.refs.dragContainer.addEventListener("mousemove", this.mouseMove, false);
        this.refs.dragContainer.addEventListener("mouseover", this.mouseHover, false);

        this.setCursorGrab();
    }

    // invoked before a mounted component receives new props
    componentWillReceiveProps(nextProps: IDraggableProps) { }

    // invoked immediately before rendering when new props or state are being received
    componentWillUpdate(nextProps: IDraggableProps, nextState: IDraggableState) { }

    // invoked immediately after updating occurs
    componentDidUpdate(prevProps: IDraggableProps, prevState: IDraggableState) { }

    // invoked immediately before a component is unmounted and destroyed
    componentWillUnmount() {
        window.removeEventListener("mouseup", this.mouseUp, false);
        this.refs.dragContainer.removeEventListener("mousedown", this.mouseDown, false);
        this.refs.dragContainer.removeEventListener("mousemove", this.mouseMove, false);
        this.refs.dragContainer.removeEventListener("mouseover", this.mouseHover, false);
    }

    //#endregion

    setCursorGrab() {
        this.refs.dragContainer.style.cursor = "move";
        this.refs.dragContainer.style.cursor = "-webkit-grab";
        this.refs.dragContainer.style.cursor = "-moz-grab";
        this.refs.dragContainer.style.cursor = "grab";
        if ((this.refs.dragContainer.style as any).webkitUserSelect) (this.refs.dragContainer.style as any).webkitUserSelect = "none";
        if ((this.refs.dragContainer.style as any).msUserSelect) (this.refs.dragContainer.style as any).msUserSelect = "none";
        if ((this.refs.dragContainer.style as any).userSelect) (this.refs.dragContainer.style as any).userSelect = "none";
    }

    setCursorGrabbing() {
        this.refs.dragContainer.style.cursor = "move";
        this.refs.dragContainer.style.cursor = "-webkit-grabbing";
        this.refs.dragContainer.style.cursor = "-moz-grabbing";
        this.refs.dragContainer.style.cursor = "grabbing";
        if ((this.refs.dragContainer.style as any).webkitUserSelect) (this.refs.dragContainer.style as any).webkitUserSelect = "none";
        if ((this.refs.dragContainer.style as any).msUserSelect) (this.refs.dragContainer.style as any).msUserSelect = "none";
        if ((this.refs.dragContainer.style as any).userSelect) (this.refs.dragContainer.style as any).userSelect = "none";
    }

    mouseUp(ev: MouseEvent) {
        if (this._mouseDown) {
            this._mouseDown = false;
            this.props.onDragEnd(ev.clientX, ev.clientY, ev);
            this.setCursorGrab();
        }
    }

    mouseDown(ev: MouseEvent) {
        this._mouseDown = true;
        this._mousePosX = ev.clientX;
        this._mousePosY = ev.clientY;
        this.props.onDragStart(ev.clientX, ev.clientY, ev);
        this.setCursorGrabbing();
    }

    mouseMove(ev: MouseEvent) {
        if (this._mouseDown) {
            this.props.onDragging(ev.clientX, ev.clientY, ev);
        }
    }

    mouseHover(ev: MouseEvent) {
        //this.setCursorGrab();
        if (this._mouseDown) {
            this.setCursorGrabbing();
        }
    }


    render() {
        return (
            <div ref="dragContainer" className="draggable">
                {this.props.children}
            </div>
        );
    }
}

export default Draggable;