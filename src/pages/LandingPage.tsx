import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { textToSVG } from '../utils/gCode';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
    classes: any;
    history: any;
    theme: any;
}
interface State {
    gCode: string;
    loading: boolean;
    text: string;
}

class LandingPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { text: '', gCode: '', loading: false };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({ text: event.target.value });

    generateGCode = () =>
        this.setState(
            { loading: true },
            // async () => this.setState({ gCode: await hersheysSVG(this.state.text), loading: false })
            async () => this.setState({ gCode: await textToSVG(this.state.text), loading: false })
        );

    downloadSVG = () => {
        const svgBlob = new Blob([this.state.gCode], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = 'generatedSVG.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    render() {
        const { classes, history, theme } = this.props;
        const { gCode, loading } = this.state;
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
                            onClick={() => history.push('/letters')}
                        >
                            {'Enter Letter Code'}
                        </Button>
                        <Typography
                            variant="h5"
                            align="center"
                            color="inherit"
                            className={classes.title}
                        >
                            {'G Code Generator'}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div className={classes.root}>
                    <div className={classes.hero}>
                        <div className={classes.content}>
                            <div className={classes.text}>
                                <Typography
                                    variant="h5"
                                    component="h2"
                                    color="inherit"
                                    gutterBottom
                                    className={classes.h5}
                                >
                                    {`Enter text, Press 'Generate'`}
                                </Typography>
                                <TextField
                                    id="outlined-basic"
                                    required
                                    className={classes.textField}
                                    label="Tweet Text"
                                    margin="normal"
                                    onChange={this.handleChange}
                                    variant="outlined"
                                />
                                {loading ? (
                                    <CircularProgress
                                        size={35}
                                        className={classes.buttonProgress}
                                    />
                                ) : (
                                    <Button
                                        onClick={this.generateGCode}
                                        className={classes.button}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        {'Generate'}
                                    </Button>
                                )}
                                {gCode.length ? (
                                    <Paper
                                        className={classes.root}
                                        style={{ marginTop: '5rem', padding: '2rem' }}
                                    >
                                        <Typography variant="h5" component="h3">
                                            Generated SVG:
                                        </Typography>

                                        <div dangerouslySetInnerHTML={{ __html: gCode }}></div>

                                        <Button
                                            onClick={this.downloadSVG}
                                            className={classes.button}
                                            variant="contained"
                                            color="primary"
                                        >
                                            {'Download'}
                                        </Button>

                                        {/* <div
                                            dangerouslySetInnerHTML={{
                                                __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="450" height="280">${gCode}</svg>`
                                            }}
                                        ></div> */}

                                        {/* <Typography
                                            component="p"
                                            style={{ whiteSpace: 'pre-wrap' }}
                                        > */}
                                        {/* </Typography> */}
                                    </Paper>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// @ts-ignore
export default withRouter(withStyles(styles, { withTheme: true })(LandingPage));
