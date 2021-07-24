import React from 'react'

function TableRow(props) {
    return props.keys.map((key, index) => {
        return <td key={index}>{props.data[key]}</td>
    });
}

function areEqual(prevProps, nextProps) {
    return prevProps!==nextProps;
}

export default React.memo(TableRow, areEqual);