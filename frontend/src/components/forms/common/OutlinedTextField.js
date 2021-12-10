import {
    FormControl, FormHelperText,
    InputLabel,
    OutlinedInput
} from "@mui/material";

function OutlinedTextField(props) {
    const { id, feedback, label, formcontrolsx} = props;

    return (
        <FormControl
            sx={formcontrolsx}
            variant="outlined"
            error={feedback !== ''}
            fullWidth
        >
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                id={id}
                type='email'
                { ...props }
            />
            <FormHelperText id="email-error-text">{feedback}</FormHelperText>
        </FormControl>
    );
}

export default OutlinedTextField;