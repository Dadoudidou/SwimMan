import * as React from "react"
import { Toolbar, Typography, withStyles, WithStyles, StyledComponentProps } from "material-ui"

type IStyle = "title" | "spacer" | "actions"

const styles = theme => {
    return {
        title: {
            flex: "0 0 auto"
        } as React.CSSProperties,
        spacer: {
            flex: "1 1 100%"
        } as React.CSSProperties,
        actions: {

        } as React.CSSProperties
    };
};

type TitlePageProps = {
    titleName?: string
    subTitle?: string
    actions?: React.ReactNode
} 

class TitlePage extends React.PureComponent<TitlePageProps & WithStyles<IStyle>, any>{
    render(){
        return (
            <Toolbar>
                <div className={this.props.classes.title}>
                    <Typography type="title">{this.props.titleName}</Typography>
                    {(this.props.subTitle) ? <br /> : undefined}
                    {
                        (this.props.subTitle) ?
                        <Typography type="caption">{this.props.subTitle}</Typography>
                        : undefined
                    }
                </div>
                <div className={this.props.classes.spacer}></div>
                <div className={this.props.classes.actions}>
                    {this.props.actions}
                </div>
            </Toolbar>
        )
    }
}

export default withStyles(styles)<TitlePageProps>(TitlePage);