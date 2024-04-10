import React from 'react';

class NumberRow extends React.Component {
    render() {
        const { onSelectClick, number, isSelected, isLocked } = this.props;
        return (
            <>
                <tr>
                    <td className='col-md-6'>{number}</td>
                    <td className='col-md-4'>
                        <button className={`btn btn-outline-${isSelected ? 'info' : 'danger'} w-100`}
                            onClick={onSelectClick}
                            disabled={isLocked }                        >
                            {isSelected ? 'Add To Selected' : 'Remove From Selected'}
                        </button>
                    </td>
                </tr>
            </>
        )
    }
}

export default NumberRow;