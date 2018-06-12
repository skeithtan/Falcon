import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { genericModalStyle } from "../../../../../components/styles";
import { subjectIsUpdated } from "../../../../../redux/actions/subject.actions";
import { updateSubject } from "../../../../../services/subjects.service";
import { getDifference } from "../../../../../utils/difference.util";
import { addSubjectToFaculties, removeSubjectFromFaculties } from "../../../../../utils/subject.util";
import { ExpertFacultiesModal as Component } from "./ExpertFacultiesModal";


const mapDispatchToProps = dispatch => ({
    onSubmitForm(subject, selectedFaculties, oldFaculties) {
        const selectedFacultiesId = selectedFaculties.map(faculty => faculty._id);
        const {addedItems, removedItems} = getDifference(selectedFaculties, oldFaculties);

        return updateSubject(subject._id, {faculties: selectedFacultiesId})
            .then(result => result.data.subject.update.faculties)
            .then(newFaculties => {
                dispatch(subjectIsUpdated({
                    ...subject,
                    faculties: newFaculties,
                }));

                addSubjectToFaculties({
                    dispatch,
                    subject,
                    faculties: addedItems,
                });

                removeSubjectFromFaculties({
                    dispatch,
                    subject,
                    faculties: removedItems,
                });

                return newFaculties;
            });
    },
});

export const ExpertFacultiesModal = compose(
    connect(null, mapDispatchToProps),
    withStyles(genericModalStyle),
)(Component);