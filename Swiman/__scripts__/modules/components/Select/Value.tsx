import * as React from "react";
import * as ApiModels from "modules/api/models";

interface IValue {
    className?: string
    style?: React.CSSProperties
    title?: string
    href?: string
    target?: string
}

interface IValueProps {
    disabled?: boolean
    id?: string
    onClick?: (value: IValue, event: React.MouseEvent<any> | React.TouchEvent<any>) => void
    onRemove?: (value: IValue) => void
    value: IValue
}

interface IValueState {

}

class Value extends React.PureComponent<IValueProps, IValueState>
{
    static defaultProps: IValueProps = {
        onClick: () => { },
        onRemove: () => { },
        value: 0
    }
    constructor(props: IValueProps ) {
        super(props);
        this.state = {};
    }

    dragging: boolean = false;

    handleMouseDown(event: React.MouseEvent<any> | React.TouchEvent<any>) {
        if (event.type === 'mousedown' && (event as React.MouseEvent<any>).button !== 0) {
            return;
        }
        if (this.props.onClick) {
            event.stopPropagation();
            this.props.onClick(this.props.value, event);
            return;
        }
        if (this.props.value.href) {
            event.stopPropagation();
        }
    }

    onRemove(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onRemove(this.props.value);
    }

    handleTouchEndRemove(event: React.TouchEvent<HTMLDivElement>) {
        if (this.dragging) return;
        this.onRemove(event as any);
    }

    handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
        this.dragging = true;
    }

    handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
        this.dragging = false;
    }



    render() {
        let className = "select-value";
        if (this.props.value.className) className += " " + this.props.value.className;
        return (
            <div className={className}
                style={this.props.value.style}
                title={this.props.value.title}>
                {this.renderRemoveIcon()}
                {this.renderLabel()}
            </div>
        );
    }

    renderRemoveIcon() {
        if (this.props.disabled || !this.props.onRemove) return;
        return (
            <span className="select-value-icon"
                aria-hidden="true"
                onMouseDown={this.onRemove}
                onTouchEnd={this.handleTouchEndRemove}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}>
                &times;
            </span>
        );
    }

    renderLabel() {
        let className = "select-value-label";
        if (this.props.onClick || this.props.value.href) {
            return (
                <a className={className} href={this.props.value.href}
                    target={this.props.value.target}
                    onMouseDown={this.handleMouseDown}
                    onTouchEnd={this.handleMouseDown}>
                    {this.props.children}
                </a>
            );
        }

        return (
            <span className={className} role="option" aria-selected="true" id={this.props.id}>
                {this.props.children}
            </span>
        );

    }
}

export default Value;