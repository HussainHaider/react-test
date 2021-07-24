import React from 'react'

function TableHeader(props) {
    const { data, sortTypes, currentSort, onSortChange } = props;
    return (
        <>
            <thead>
                <tr>{data.map((key, index) => {
                    return <th key={key}>
                        {key.toUpperCase()}
                        {
                            key === 'userId' && (<button onClick={onSortChange}>
                                <i className={`fa fa-${sortTypes[currentSort].class}`} />
                            </button>)
                        }
                    </th>
                })}</tr>
            </thead>
        </>
    )
}

function areEqual(prevProps, nextProps) {
    return prevProps !== nextProps;
}

export default React.memo(TableHeader, areEqual);