import axios from "axios";

import {
    SET_PR_INFORMATION,
} from "./types";

export const getPRInfo = () => dispatch => {
    axios
        .post("http://localhost:8000/api/v1/fetchPRInfo")
        .then(res => {
            dispatch(setPRInformation(res?.data?.prInfoList));
        })
        .catch(err => {
            console.error("err", err)
        }
        );
}

export const download = data => dispatch => {
    axios
        .post("http://localhost:8000/api/v1/download", data)
        .then(res => {
            alert("Downloaded!");
        })
        .catch(err => {
            console.error("err", err)
            alert("Error! Please check the developer console!")
        }
        );
}

//Set logged in user
export const setPRInformation = decoded => {
    return {
        type: SET_PR_INFORMATION,
        payload: decoded
    };
};