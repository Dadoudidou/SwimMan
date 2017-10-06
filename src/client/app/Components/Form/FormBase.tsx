import * as React from "react";


export type FormBaseProps = {
    attrs?: any
    onRequestSave?: (attrs: any) => void
}
type FormBaseState = {
    __obj?: any
}
class FormBase<TProps = {}, TState = {}> extends React.PureComponent<TProps & FormBaseProps, FormBaseState>
{
    constructor(props: TProps & FormBaseProps){
        super(props);
        this.state = {
            __obj: (props.attrs) ? JSON.parse(JSON.stringify(props.attrs)) : {}
        }
        this.onChange = this.onChange.bind(this);
        this._bind = this._bind.bind(this);
        this.save = this.save.bind(this);
        this.reset = this.reset.bind(this);
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
    }
    componentDidMount(){}

    componentWillReceiveProps(nextProps: Readonly<TProps & FormBaseProps>){}

    onChange = name => event => {
        if(this.$onChange[name]){
            this.$onChange[name](event, (value) => {
                this.setState({
                    ...this.state,
                    __obj: {
                        ...this.state.__obj,
                        [name]: value
                    }
                });
            })
        } else {
            this.setState({
                ...this.state,
                __obj: {
                    ...this.state.__obj,
                    [name]: event.target.value
                }
            });
        }
    }

    _bind(name: string){
        return {
            value: (this.state.__obj[name]) ? this.state.__obj[name] : "",
            onChange: this.onChange(name)
        }
    }

    save(){
        if(this.props.onRequestSave)
            this.props.onRequestSave(this.state.__obj);
    }

    reset(attrs:any = {}){
        this.setState({
            ...this.state,
            __obj: (attrs) ? JSON.parse(JSON.stringify(attrs)) : {}
        })
    }

    get(key?: string){
        if(key == undefined) return this.state.__obj;
        return this.state.__obj[key];
    }

    set(key: string, value: any){
        this.setState({
            ...this.state,
            __obj: {
                ...this.state.__obj,
                [key]: value
            }
        })
    }

    render(){
        return (
            <div>
                {this.$render(this._bind)}
            </div>
        )
    }

    $onChange: {[key: string]: (event, next:((value: any) => void)) => void} = {}

    $render($: (name: string) => any){
        return null;
    }
}

export default FormBase;