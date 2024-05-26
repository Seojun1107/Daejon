import React from "react";
import './Loading.css'

function Loading(props) {
    return(
        <ul>
            <li>
                <div class="loader">
                <div class="child"></div>
                </div>
            </li>

            <li>
                <div class="text"></div>
            </li>
        </ul>

    )
}

export default Loading