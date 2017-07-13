import * as React from "react";
import * as ReactDOM from "react-dom";
import * as moment from "moment";
import * as Models from "./models";


interface IDefaultProps { }
interface IDefaultState { }
class Default extends React.PureComponent<IDefaultProps, IDefaultState>
{
    render()
    {
        return (
            <div></div>
        );
    }
}

//#region CHART AREA

interface IChartAreaProps {
    resourcesColumns: Models.IResourceColumn[]
    resources: IFlatResource[]

    headerStyle?: React.CSSProperties
    className?: string
    style?: React.CSSProperties
}
interface IChartAreaState { }
class ChartArea extends React.PureComponent<IChartAreaProps, IChartAreaState>
{
    render() {
        let __this = this;
        let _style: React.CSSProperties = {
            width: "100%",
            borderCollapse: "collapse",
            ...this.props.style
        }
        let _headStyle: React.CSSProperties = {
            borderLeft: "1px solid #aaa",
            fontWeight: "normal",
            textAlign: "left",
            width: 50,
            minWidth: 50,
            maxWidth: 100,
            display: "inline-block",
            ...this.props.headerStyle
        }
        let _cellStyle: React.CSSProperties = {
            height: 12 * 2,
            borderLeft: "1px solid #aaa",
            borderTop: "1px solid #aaa",
            width: 50,
            minWidth: 50,
            maxWidth: 100,
            display: "inline-block",
        }
        let _hours = [];
        let _cells = [];
        for (let i = 7; i < 23; i++) {
            _hours.push(
                <div style={_headStyle} key={i + ":00"}>
                    {moment().hour(i).minute(0).format("HH:mm")}
                </div>
            )
            _cells.push(
                <div style={_cellStyle} key={i + ":00"}>
                </div>
            );
        }
        return (
            <div>
                <div style={_style}>
                    {_hours}
                </div>
                <div>
                    {this.props.resources.map(resource => {
                        return (
                            <div key={resource.uniqueKey} style={{ height: 12 * 2 + 3, position: "relative" }}>
                                <div>{_cells}</div>
                                <div style={{ position: "absolute", top: 5, bottom: 5, left: 0, right: 0, background: "#f00", opacity: 0.2 }}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

//#endregion


//#region RESOURCE AREA

interface IResourceProps {
    resourcesColumns: Models.IResourceColumn[]
    resource: IFlatResource
    level?: number

    className?: string
    style?: React.CSSProperties
}
interface IResourceState { }
class Resource extends React.PureComponent<IResourceProps, IResourceState>
{
    render() {
        let __this = this;
        let _style: React.CSSProperties = {
            borderTop: "1px solid #aaa",
            ...this.props.style
        }
        let _tdStyle: React.CSSProperties = {
            height: 12 * 2,
            lineHeight: (12 * 2) + "px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            borderLeft: "1px solid #aaa",
            paddingLeft: this.props.resource.parentLevel * 20
        }
        return (
            <tr style={_style}>
                {this.props.resourcesColumns.map((resourceColumn, index) => {
                    let _style: React.CSSProperties = {
                        ..._tdStyle,
                        borderLeft: (index == 0) ? undefined : _tdStyle.borderLeft
                    }
                    return (
                        <td key={resourceColumn.field} style={_style}>
                            {__this.props.resource.resource[resourceColumn.field]}
                        </td>
                    );
                })}
            </tr>
        );
    }
}

interface IResourcesAreaProps {
    resourcesColumns: Models.IResourceColumn[]
    resources: IFlatResource[]
    title: string

    className?: string
    style?: React.CSSProperties
    headerStyle?: React.CSSProperties
}
interface IResourcesAreaState { }

class ResourcesArea extends React.PureComponent<IResourcesAreaProps, IResourcesAreaState>
{

    render() {
        let __this = this;

        let _style: React.CSSProperties = {
            width: "100%",
            borderCollapse: "collapse",
            ...this.props.style
        }

        let _headStyle: React.CSSProperties = {
            ...this.props.headerStyle
        }

        return (
            <table style={_style}>
                <thead>
                    <tr>
                        {this.props.resourcesColumns.map(resourceColumn => {
                            return (
                                <th key={resourceColumn.field} style={_headStyle}>{resourceColumn.label}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.resources.map((resource, index) => {
                        return (
                            <Resource
                                key={resource.uniqueKey}
                                resource={resource}
                                resourcesColumns={__this.props.resourcesColumns} />
                        );
                    })}
                </tbody>
            </table>
        );
    }
}


//#endregion


interface ITimeLineProps {
    resourcesColumns?: Models.IResourceColumn[]
    resources?: Models.IResource[]
    events?: Models.IEvent[]
    title?: string


    className?: string
    style?: React.CSSProperties
}
interface ITimeLineState { }

interface IFlatResource {
    resource: Models.IResource
    parentLevel: number
    parent: Models.IResource
    uniqueKey: string
}

class TimeLine extends React.PureComponent<ITimeLineProps, ITimeLineState>
{
    static defaultProps: ITimeLineProps = {
        resources: [],
        events: [],
        resourcesColumns: [{ label: "Resources", field: "title" }]
    }

    constructor(props: ITimeLineProps) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps: ITimeLineProps) {

    }

    GetFlatResources(resources: Models.IResource[], level?: number, parent?: Models.IResource, parentKey?: string): IFlatResource[] {
        let _flatResources: IFlatResource[] = [];
        let __this = this;
        let _level = (level == undefined) ? 0 : level;
        let _key = (parentKey) ? parentKey : "";
        resources.forEach(x => {
            let __key = _key + "." + x.id;
            _flatResources.push({
                resource: x,
                parent: parent,
                parentLevel: _level,
                uniqueKey: __key
            });
            if (x.children) {
                _flatResources = _flatResources.concat(__this.GetFlatResources(x.children, _level + 1, x, __key));
            }
        })
        return _flatResources;
    }

    render() {

        let _style: React.CSSProperties = {
            position: "relative",
            border: "1px solid #aaa",
            ...this.props.style
        }

        let _resourceWidth = 200;
        let _headerHeight = 50;
        let _flatResources: IFlatResource[] = this.GetFlatResources(this.props.resources);

        let _resourceStyle: React.CSSProperties = {
            width: _resourceWidth,
            overflow: "auto",
            position: "absolute",
            top: 0, left: 0
        }
        let _dividerStyle: React.CSSProperties = {
            position: "absolute",
            left: _resourceWidth,
            width: 1,
            top: 0, bottom: 0,

            backgroundColor: "#aaa"
        }
        let _chartStyle: React.CSSProperties = {
            marginLeft: _resourceWidth + 1,
            position: "relative"
        }

        let _headerStyle: React.CSSProperties = {
            height: 12 * 2
        }

        return (
            <div className={this.props.className} style={_style}>
                <div style={_resourceStyle}>
                    <ResourcesArea
                        resources={_flatResources}
                        resourcesColumns={this.props.resourcesColumns}
                        title={this.props.title}
                        headerStyle={_headerStyle} />
                </div>
                <div style={_dividerStyle}></div>
                <div style={_chartStyle}>
                    <ChartArea
                        resources={_flatResources}
                        resourcesColumns={this.props.resourcesColumns}
                        headerStyle={_headerStyle} />
                </div>
            </div>
        );
    }
}


export default TimeLine;