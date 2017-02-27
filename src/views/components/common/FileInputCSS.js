const styles = {
    container: {
        width: '100%',
        padding: '0px 10px'
    },
    
    disabler: {
        backgroundColor: '#999',
        opacity: '0.5',
        width: '290px',
        height: '100%',
        position: 'absolute',
        zIndex: '-1'
    },
    
    leftBranch: {
        container: {
            width: '190px',
            padding: "0px 5px"
        },
        input: {
            width: '100%'
        }
    },
    
    rightBranch: {
        container: {
            width: '85px',
            padding: '30px 0px'
        },
        button: {
            width: '85px',
            paddingLeft: '0px',
            paddingtop: '0px',
            paddingBottom: '0px',
            paddingRight: '0px',
            height: '32px'
        }
    }
};

export default styles;
