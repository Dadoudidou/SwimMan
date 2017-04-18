declare module "react-grid-system" {
    export import Container = __ReactGridSystem.Container;
    export import Row = __ReactGridSystem.Row;
    export import Col = __ReactGridSystem.Col;
    export import Visible = __ReactGridSystem.Visible;
    export import Hidden = __ReactGridSystem.Hidden;
    export import ClearFix = __ReactGridSystem.ClearFix;
    export import ScreenClassRender = __ReactGridSystem.ScreenClassRender;
}

declare namespace __ReactGridSystem {

    interface IContainerProps {
        fluid?: boolean
        style?: number | string
    }
    export class Container extends React.Component<IContainerProps, any> {
    }


    interface IRowProps {
        style?: number | string
    }
    export class Row extends React.Component<IRowProps, any>{ }

    interface IColProps {
        xs?: number,
        sm?: number,
        md?: number,
        lg?: number,
        offset?: {
            xs?: number,
            sm?: number,
            md?: number,
            lg?: number,
        }
        style?: number | string
    }
    export class Col extends React.Component<IColProps, any>{ }

    interface IVisibleProps {
        xs?: boolean,
        sm?: boolean,
        md?: boolean,
        lg?: boolean,
        xl?: boolean
    }
    export class Visible extends React.Component<IVisibleProps, any>{ }

    interface IHiddenProps {
        xs?: boolean,
        sm?: boolean,
        md?: boolean,
        lg?: boolean,
        xl?: boolean
    }
    export class Hidden extends React.Component<IHiddenProps, any>{ }

    interface IClearfixProps {
        xs?: boolean,
        sm?: boolean,
        md?: boolean,
        lg?: boolean,
        xl?: boolean
    }
    export class ClearFix extends React.Component<IClearfixProps, any>{ }

    interface IScreenClassRenderProps {
        style?: (screenClass?: 'xl' | 'lg' | 'md' | 'sm' | 'xs') => React.CSSProperties
        render?: Function
    }
    export class ScreenClassRender extends React.Component<IScreenClassRenderProps, any> { }
}