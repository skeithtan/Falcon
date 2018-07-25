import { lighten } from "@material-ui/core/styles/colorManipulator";

export const styles = theme => ({
    facultiesCardContainer: {
        height: "100%",
    },
    facultiesListContainer: {
        overflowY: "scroll",
    },
    searchInput: {
        padding: 8,
        boxSizing: "border-box",
    },
    searchContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        // background: theme.palette.grey["100"],
    },
    searchAdornment: {
        color: theme.palette.grey["600"],
    },
    facultyList: {
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
      },
    facultyListSection: {
        backgroundColor: "inherit",
    },
    facultyUl: {
        backgroundColor: "inherit",
        padding: 0,
    },
});
