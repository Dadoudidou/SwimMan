import * as React from "react"

interface IPageLayoutProps {}

class PageLayout extends React.PureComponent<IPageLayoutProps, any>
{
    render(){
        return (
            <div className="layout-page">
                {this.props.children}
            </div>
        )
    }
}

export default PageLayout;