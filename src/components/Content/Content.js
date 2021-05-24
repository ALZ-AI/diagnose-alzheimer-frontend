import React from "react";


function Content(props) {



    return (
        <div style={{flex: "1 0 auto", background: "purple"}}>
            {props.children}
        </div>
    )
}

export default Content;