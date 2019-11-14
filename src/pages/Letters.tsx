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
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    // Pick<State, "letter" | "gcode">
    handleChange = (
        key: 'letter' | 'gcode',
        event: React.ChangeEvent<HTMLInputElement>
        // @ts-ignore
    ) => this.setState({ [`${key}`]: event.target.value });

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
                        <div style={{ flex: 1 }}>
                            <Button
                                className={classes.button}
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    history.push('/');
                                }}
                            >
                                {'Generate New G-Code'}
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <div className={classes.hero}>
                        <div className={classes.content}>
                            <div className={classes.text}>
                                <Typography
                                    variant="h3"
                                    align="center"
                                    component="h1"
                                    color="inherit"
                                    gutterBottom
                                    className={classes.title}
                                >
                                    {'Enter G Code for Letters'}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    color="inherit"
                                    gutterBottom
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
                                        this.handleChange('letter', e)
                                    }
                                    value={this.state.letter}
                                    variant="outlined"
                                />
                                <TextField
                                    id="g-code"
                                    required
                                    multiline
                                    className={classes.textField}
                                    label="G-Code"
                                    margin="normal"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        this.handleChange('gcode', e)
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
                    </div>
                </div>
            </div>
        );
    }
}
// @ts-ignore
export default withRouter(withStyles(styles, { withTheme: true })(LettersPage));
