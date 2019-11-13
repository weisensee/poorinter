import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { generateGCode } from '../utils/gCode';

const LandingPage = ({ classes, history, theme }) => {
	return (
		<div className={classes.main}>
			<Helmet>
				<meta name="theme-color" content={theme.palette.primary.main} />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={theme.palette.primary.main}
				/>
				<meta name="msapplication-navbutton-color" content={theme.palette.primary.main} />
				<title>G Code Generator</title>
			</Helmet>
			<AppBar position="static">
				<Toolbar disableGutters>
					<div style={{ flex: 1 }} />
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
								{'G Code Generator'}
							</Typography>
							<Typography
								variant="h5"
								component="h2"
								color="inherit"
								gutterBottom
								className={classes.h5}
							>
								{`Enter text, Press 'Generate'`}
							</Typography>
							<Button
								onClick={generateGCode}
								className={classes.button}
								variant="outlined"
								color="primary"
							>
								{'Generate'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(withStyles(styles, { withTheme: true })(LandingPage));
