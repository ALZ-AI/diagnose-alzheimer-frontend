import React from "react";


function Content(props) {



    return (
        <div style={{flex: "1 0 auto"}}>
            {props.children}
        </div>
    )
}

export default Content;