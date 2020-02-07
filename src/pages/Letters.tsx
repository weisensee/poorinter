import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { saveNewGCode } from '../utils/gCode';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import ExistingLetters from '../components/ExistingLetters';

interface Props {
    classes: any;
    history: any;
    theme: any;
}
interface State {
    letter: string;
    loading: boolean;
    gcode: string;
}

class LettersPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { letter: '', loading: false, gcode: '' };
    }

    // @ts-ignore
    handleChange = (key: 'letter' | 'gcode', value: string) => this.setState({ [key]: value });

    saveGCode = () =>
        this.setState({ loading: true }, () =>
            saveNewGCode(this.state.letter, this.state.gcode).then(() =>
                this.setState({ letter: '', loading: false, gcode: '' })
            )
        );

    render() {
        const { classes, history, theme } = this.props;
        return (
            <div className={classes.main}>
                <Helmet>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content={theme.palette.primary.main}
                    />
                    <meta
                        name="msapplication-navbutton-color"
                        content={theme.palette.primary.main}
                    />
                    <title>G Code Generator</title>
                </Helmet>
                <AppBar position="static">
                    <Toolbar disableGutters>
                        <Button
                            className={classes.button}
                            style={{ margin: '.5rem' }}
                            variant="contained"
                            color="secondary"
                            onClick={() => history.push('/')}
                        >
                            {'Generate New G-Code'}
                        </Button>
                        <Typography
                            variant="h5"
                            align="center"
                            color="inherit"
                            className={classes.title}
                        >
                            {'Enter G Code for Letters'}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div className={classes.content}>
                                <div className={classes.text}>
                                    <Typography
                                        variant="h5"
                                        component="h2"
                                        color="inherit"
                                        className={classes.h5}
                                    >
                                        {`Enter text, Press 'Save'`}
                                    </Typography>
                                    <TextField
                                        id="letter"
                                        required
                                        className={classes.textField}
                                        label="Letter"
                                        margin="normal"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            this.handleChange(
                                                'letter',
                                                e.target.value.slice(-1).toUpperCase()
                                            )
                                        }
                                        value={this.state.letter}
                                        variant="outlined"
                                    />
                                    <TextField
                                        id="g-code"
                                        required
                                        multiline
                                        className={classes.textField}
                                        style={{ width: '100%' }}
                                        label="G-Code"
                                        margin="normal"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            this.handleChange('gcode', e.target.value)
                                        }
                                        value={this.state.gcode}
                                        variant="outlined"
                                    />
                                    {this.state.loading ? (
                                        <CircularProgress
                                            size={35}
                                            className={classes.buttonProgress}
                                        />
                                    ) : (
                                        <Button
                                            onClick={this.saveGCode}
                                            className={classes.button}
                                            variant="outlined"
                                            disabled={!this.state.letter || !this.state.gcode}
                                            color="primary"
                                        >
                                            {'Save'}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.content}>
                                <ExistingLetters
                                    classes={this.props.classes}
                                    theme={this.props.theme}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}
// @ts-ignore
export default withRouter(withStyles(styles, { withTheme: true })(LettersPage));
