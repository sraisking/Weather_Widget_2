import { makeStyles, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
const useStyles = makeStyles({

    textContainer: {
        display: 'flex'
    }
});
const ErrorComponent = () => {
    const classes = useStyles()
    return (
        <div className={classes.textContainer}>
            <div>
                <ErrorIcon color="secondary" />
            </div>
            <div >
                <Typography variant='h3'>
                    Error in service Call
                </Typography>
            </div>
        </div>
    )
}
export default ErrorComponent