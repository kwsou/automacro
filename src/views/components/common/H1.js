import React from 'react';
import styled from 'styled-components';

const _H1 = styled.h1`
    position: absolute;
    top: 25%;
    left: 0px;
    width: 100%;
    text-align: center;
    line-height: 28px;
    font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
    font-size: 45px;
    font-weight: 100;
`;

class H1 extends React.Component {
    static propTypes = {}
    
    static defaultProps = {
        title: 'Sample Title'
    }
    
    render() {
        const { title } = this.props;
        
        return (
            <h1>
                {title}
            </h1>
        );
    }
}

export default H1;
