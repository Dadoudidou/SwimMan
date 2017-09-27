import * as React from "react"
import { classNames } from "modules/classnames"
import { Grid } from "material-ui"

require("./PageLayout.scss");

interface IPageLayoutProps {
    className?: string
}

class PageLayout extends React.PureComponent<IPageLayoutProps, any>
{
    render(){
        return (
            <div className={classNames("layout-page",this.props.className)}>
                <Grid container>
                    <Grid item xs={12}>
                        {this.props.children}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default PageLayout;