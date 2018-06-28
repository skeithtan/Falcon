import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { chip } from "../styles";


export const wrapper = compose(
    withStyles(chip),
    withRouter,
);