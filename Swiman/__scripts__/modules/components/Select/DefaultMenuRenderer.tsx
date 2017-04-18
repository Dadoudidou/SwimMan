import * as React from "react";
import * as ApiModels from "modules/api/models";
import { IOption } from "./Option";


export const menuRenderer = (props:{
    focusedOption?: IOption,
    instancePrefix?: string,
    labelKey,
    onFocus?: (option: IOption, event: React.MouseEvent<any>) => void,
    onSelect?: (option: IOption, event: React.MouseEvent<any>) => void,
    optionClassName?: string,
    optionComponent?: any,
    optionRenderer?: (option: IOption, index: number) => React.ReactNode,
    options?: IOption[],
    valueArray?: any[],
    valueKey?: string,
    onOptionRef?: (ref: any, isFocused: boolean) => void
}) => {
    let Option = props.optionComponent;
    return props.options.map((option, i) => {
        let isSelected = props.valueArray && props.valueArray.indexOf(option) > -1;
        let isFocused = option === props.focusedOption;
        let optionClass = ["select-option"];
        if (props.optionClassName) optionClass.push(props.optionClassName);
        if (isSelected) optionClass.push("is-selected");
        if (isFocused) optionClass.push("is-focused");
        if (option.disabled) optionClass.push("is-disabled");
        return React.createElement(Option, {
            className: optionClass.join(" "),
            instancePrefix: props.instancePrefix,
            isDisabled: option.disabled,
            isFocused: isFocused,
            isSelected: isSelected,
            key: "option-" + i + "-" + option[props.valueKey],
            onFocus: props.onFocus,
            onSelect: props.onSelect,
            option: option,
            optionIndex: i,
            ref: (ref) => { props.onOptionRef(ref, isFocused); }
        }, props.optionRenderer(option, i));
    });
}

