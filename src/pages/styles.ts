export const styles = (theme: any) => ({
    main: {
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        flexGrow: 1,
        flex: '1 0 100%'
        // height: '100%',
        // overflow: 'hidden'
    },
    hero: {
        height: '100%',
        // minHeight: '80vh',
        flex: '0 0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
        color:
            theme.palette.type === 'light' ? theme.palette.primary.dark : theme.palette.primary.main
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        letterSpacing: '.7rem',
        textIndent: '.7rem',
        fontWeight: theme.typography.fontWeightLight,
        [theme.breakpoints.only('xs')]: {
            fontSize: 24,
            letterSpacing: '.1em',
            textIndent: '.1rem'
        },
        whiteSpace: 'nowrap'
    },
    h5: {
        paddingLeft: theme.spacing(1) * 4,
        paddingRight: theme.spacing(1) * 4,
        marginTop: theme.spacing(1),
        maxWidth: 600,
        textAlign: 'center',
        [theme.breakpoints.only('xs')]: {
            fontSize: 18
        }
    },
    content: {
        height: '100%',
        // paddingTop: theme.spacing(1) * 8,
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(1)
        }
    },
    button: {
        marginTop: theme.spacing(1) * 3
    },
    logo: {
        color: 'red',
        margin: `${theme.spacing(1) * 3}px 0 ${theme.spacing(1) * 4}px`,
        width: '100%',
        height: '40vw',
        maxHeight: 250
    },
    steps: {
        maxWidth: theme.spacing(1) * 130,
        margin: 'auto'
    },
    step: {
        padding: `${theme.spacing(1) * 3}px ${theme.spacing(1) * 2}px`
    },
    stepIcon: {
        marginBottom: theme.spacing(1)
    },
    markdownElement: {},
    cardsContent: {
        padding: 15,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        [theme.breakpoints.only('xs')]: {
            width: '100%',
            padding: 0,
            paddingTop: 15
        }
    },
    card: {
        minWidth: 275,
        maxWidth: 350,
        margin: 15,
        [theme.breakpoints.only('xs')]: {
            width: '100%',
            margin: 0,
            marginTop: 7
        }
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    cardTitle: {
        marginBottom: 16,
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});
