import * as React from "react";
import Layout from "app/Scenes/Layouts/AppLayout"

require("./index.scss");

import { Grid } from "material-ui"
import { Nestable } from "modules/react-jquery-nestable2"

interface IMainProps {

}

class Main extends React.PureComponent<IMainProps, any>
{

    callback(mainContainer, element){
        console.log(arguments);
    }

    renderItem(item){
        return (
            <div>
                {item.text} - <button>aaa</button>
            </div>
        )
    }
    render(){
        let __this = this;
        let _items = [
            { id:1, text: "Item 01", children:[] },
            { 
                id:2, text: "Item 02", children:[
                    { id:3, text: "Item 03", children:[] },
                    { id:4, text: "Item 04", children:[] },
                ] 
            },
            { id:5, text: "Item 05", children:[] }
        ]
        return (
            <div style={{ margin: "auto", width: 400, border: "1px solid #aaa" }}>
                <Nestable 
                    items={_items}
                    renderItem={this.renderItem}
                    className="test"
                    maxDepth={3}
                    callback={this.callback}/>
            </div>
        )
    }
}

export default Main;

