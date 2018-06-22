import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import React, { Fragment } from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { EMPLOYMENT, SEX } from "../../../../../enums/faculty.enums";
import { generateTemporaryPassword } from "../../../../../utils/user.util";
import { FACULTY_PROFILES_PAGE } from "../../../../index";
import { OVERVIEW_TAB } from "../../faculty_detail_tabs";
import { FacultyForm, ReviewForm, UserForm } from "./steps";


export class AddFacultyModal extends ModalFormComponent {
    get initialState() {
        return {
            activeStep: 0,
            form: {...this.initialForm},
            isSubmitting: false,
            error: null,
        };
    }

    get initialForm() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: generateTemporaryPassword(),
            photo: null,
            sex: SEX.M.identifier,
            employment: EMPLOYMENT.FULL_TIME_PERMANENT.identifier,
            birthDate: "",
            idNumber: "",
        };
    }

    handleBack = () => this.setState({
        activeStep: this.state.activeStep - 1,
    });

    handleNext = () => this.setState({
        activeStep: this.state.activeStep + 1,
    });

    get submitAddAction() {
        const {submitForm} = this.props;
        return () => submitForm(this.state.form)
            .then(faculty => {
                this.props.history.push(`/${FACULTY_PROFILES_PAGE.path}/${faculty._id}/${OVERVIEW_TAB.path}`);
                return faculty;
            });
    }

    get buttonName() {
        return "Finish";
    }

    get toastSuccessMessage() {
        return "Faculty successfully added";
    }

    get steps() {
        const {classes} = this.props;
        const {isSubmitting, form} = this.state;

        return [
            {
                label: "Create a user",
                content: (
                    <UserForm
                        handleFormChange={this.handleFormChange}
                        form={form}
                        handleNext={this.handleNext}
                    />
                ),
            },
            {
                label: "Set faculty details",
                content: (
                    <FacultyForm
                        handleFormChange={this.handleFormChange}
                        form={form}
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                    />
                ),
            },
            {
                label: "Review details",
                content: (
                    <Fragment>
                        <ReviewForm form={form} classes={classes} />
                        <Button
                            variant="outlined"
                            disabled={isSubmitting}
                            onClick={this.handleBack}
                            className={classes.backButton}>
                            Change details
                        </Button>
                        {this.renderModalFormDialogActions(false)}
                    </Fragment>
                ),
            },
        ];
    }

    renderSteps = () => this.steps.map(step => (
        <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
                <div className={this.props.classes.form}>
                    {step.content}
                </div>
            </StepContent>
        </Step>
    ));

    render() {
        const {open, classes} = this.props;
        const {activeStep} = this.state;

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>Add a Faculty</DialogTitle>
                <DialogContent className={classes.container}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {this.renderSteps()}
                    </Stepper>
                </DialogContent>
            </Dialog>
        );
    }
}