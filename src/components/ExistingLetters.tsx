import React, { PureComponent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { getAllLetters } from '../utils/gCode';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface Props {
    classes: any;
    theme: any;
}
interface State {
    allLetters: any;
    selectedLetter: string;
}

export default class ExistingLetters extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { allLetters: {}, selectedLetter: '' };
    }

    componentDidMount = () => getAllLetters(value => this.setState({ allLetters: value }));

    handleChange = (
        event: React.ChangeEvent<{
            name?: string | undefined;
            value: any;
        }>
    ) => this.setState({ selectedLetter: event.target.value });

    render() {
        const { classes } = this.props;
        const { allLetters, selectedLetter } = this.state;

        let menuItems = Object.keys(allLetters).map((letter, i) => (
            <MenuItem key={i} value={letter}>
                {letter.toUpperCase()}
            </MenuItem>
        ));

        menuItems.unshift(
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
        );

        return (
            <>
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    style={{ width: '50%', marginTop: '5vh' }}
                >
                    <div></div>
                    <InputLabel id="letter-select-view">Existing Letters</InputLabel>
                    <Select
                        labelId="letter-select-view"
                        id="letter-select-view-outlined"
                        value={selectedLetter}
                        onChange={this.handleChange}
                        labelWidth={115}
                    >
                        {menuItems}
                    </Select>
                </FormControl>
                {selectedLetter ? (
                    <Paper className={classes.content} style={{ width: '100%' }}>
                        <Typography variant="h5" component="h3">
                            {selectedLetter}
                        </Typography>
                        <Typography component="p" style={{ whiteSpace: 'pre-wrap' }}>
                            {allLetters[selectedLetter]}
                        </Typography>
                    </Paper>
                ) : null}
            </>
        );
    }
}
