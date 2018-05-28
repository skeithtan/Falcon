import { connect } from "react-redux";
import compose from "recompose/compose";
import { getFetchSubjectListThunk } from "../../../../../utils/subject.util";
import TeachingSubjectsCard from "./TeachingSubjectsCard";


function mapStateToProps(state) {
    return {
        subjects: state.subject,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllSubjects() {
            dispatch(getFetchSubjectListThunk());
        },
    };
}

export default compose(
    connect(mapStateToProps, null),
)(TeachingSubjectsCard);