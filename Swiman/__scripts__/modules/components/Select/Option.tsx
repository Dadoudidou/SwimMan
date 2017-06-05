import * as React from "react";
import * as ApiModels from "modules/api/models";

export interface IOption {
    className?: string
    disabled?: boolean
    style?: React.CSSProperties
    title?: string
}

interface IOptionProps {
    className?: string
    instancePrefix: string                                              // unique prefix for the ids
    isDisabled?: boolean                                                // option désactivé
    isFocused?: boolean                                                 // option focus
    isSelected?: boolean                                                // option sélectionné
    onFocus?: (option: IOption, event: React.MouseEvent<any>) => void   // mouseEnter on option
    onSelect?: (option: IOption, event: React.MouseEvent<any>) => void  // click on option
    onUnfocus?: () => void                                              // mouseLeave on option
    option: IOption                                                     // objet de base de option
    optionIndex?: number                                                // l'index de option
}

interface IOptionState {

}

class Option extends React.PureComponent<IOptionProps, IOptionState>
{
    constructor(props: IOptionProps ) {
        super(props);
        this.state = {};
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    dragging: boolean = false;

    blockEvent(event: React.MouseEvent<any>) {
        event.preventDefault();
        event.stopPropagation();
        if (((event.target as HTMLLinkElement).tagName !== 'A') || !('href' in event.target)) {
            return;
        }
        if ((event.target as any).target) {
            window.open((event.target as any).href, (event.target as any).target);
        } else {
            window.location.href = (event.target as any).href;
        }
    }

    handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    }

    handleMouseEnter(event: React.MouseEvent<HTMLDivElement>) {
        this.onFocus(event);
    }

    handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        this.onFocus(event);
    }

    handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
        if (this.dragging) return;
        this.handleMouseDown(event as any);
    }

    handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
        this.dragging = true;
    }

    handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
        this.dragging = false;
    }

    onFocus(event: React.MouseEvent<HTMLDivElement>) {
        this.props.onFocus(this.props.option, event);
    }

    render() {
        let { option, instancePrefix, optionIndex } = this.props;
        let className = ((this.props.className) ? this.props.className : "") + " " + ((option.className) ? option.className : "");

        if (option.disabled) {
            return (
                <div className={className}
                    onMouseDown={this.blockEvent}
                    onClick={this.blockEvent}>
                    {this.props.children}
                </div>
            );
        }

        return (
            <div className={className}
                style={option.style}
                role="option"
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseMove={this.handleMouseMove}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                id={instancePrefix + '-option-' + optionIndex}
                title={option.title}>
                {this.props.children}
            </div>
        );
    }
}

export default Option;