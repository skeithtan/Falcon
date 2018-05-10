import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ExpansionPanelDetails, ExpansionPanelSummary } from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import React, { Component } from "react";
import DetailCard from "../../../../../components/DetailCard";
import DetailExpansionCard from "../../../../../components/DetailExpansionCard";
import DetailExpansionCardActions from "../../../../../components/DetailExpansionCardActions";
import FormDisplayListItem from "../../../../../components/FormDisplayListItem";
import TableToolbar from "../../../../../components/TableToolbar";
import FACULTY_ENUMS from "../../../../../enums/faculty.enums";
import { formatMonthYearDate } from "../../../../../utils/faculty";


class PresentationRow extends Component {
    onUpdateButtonClick = presentation => {
        //TODO
        console.log(`Presentation ${presentation._id} edit button clicked`);
    };

    onRemoveButtonClick = presentation => {
        //TODO
        console.log(`Presentation ${presentation._id} remove button clicked`);
    };

    render() {
        const {presentation, classes} = this.props;
        return (
            <DetailExpansionCard>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{presentation.title}</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails className={classes.expansionPanelDetails}>

                    <FormDisplayListItem field="Category"
                                         value={FACULTY_ENUMS.PRESENTATION.CATEGORY[presentation.category]} />
                    <FormDisplayListItem field="Date"
                                         value={formatMonthYearDate(presentation.date)} />
                    <FormDisplayListItem field="Sponsor"
                                         value={presentation.sponsor} />
                    <FormDisplayListItem field="Venue"
                                         value={presentation.venue} />
                    <FormDisplayListItem field="Conference"
                                         value={presentation.conference} />
                    <FormDisplayListItem field="Medium"
                                         value={FACULTY_ENUMS.PRESENTATION.MEDIUM[presentation.medium]} />
                    <FormDisplayListItem field="Duration"
                                         value={`${presentation.daysDuration} Days`} />
                    <DetailExpansionCardActions removeButtonTooltipTitle="Remove presentation"
                                                updateButtonTooltipTitle="Update presentation details"
                                                onRemoveButtonClick={() => this.onRemoveButtonClick(presentation)}
                                                onUpdateButtonClick={() => this.onUpdateButtonClick(presentation)} />

                </ExpansionPanelDetails>
            </DetailExpansionCard>
        );
    }
}

class PresentationsTab extends Component {
    onAddButtonClick = () => {
        //TODO
        console.log("Add presentation button clicked");
    };

    rows = presentations => presentations.map(presentation =>
        <PresentationRow presentation={presentation} key={presentation._id} classes={this.props.classes}/>,
    );

    render() {
        const {faculty, classes} = this.props;
        const presentations = faculty.presentations;
        const presentationsIsEmpty = presentations.length === 0;
        return (
            <div className={classes.expansionCards}>
                <DetailCard>
                    <TableToolbar tableTitle="Presentations"
                                  addButtonTooltipTitle="Add a presentation"
                                  onAddButtonClick={this.onAddButtonClick} />
                </DetailCard>

                {!presentationsIsEmpty && this.rows(presentations)}
            </div>
        );
    }
}

export default PresentationsTab;
