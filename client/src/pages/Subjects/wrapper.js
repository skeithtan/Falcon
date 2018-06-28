import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import { fetchSubjectList } from "../../utils/subject.util";
import { styles } from "./styles";


const mapStateToProps = state => ({
    ...state.subject,
});

const mapDispatchToProps = dispatch => ({
    fetchData() {
        fetchSubjectList(dispatch);
    },
});

export const wrap = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter,
);