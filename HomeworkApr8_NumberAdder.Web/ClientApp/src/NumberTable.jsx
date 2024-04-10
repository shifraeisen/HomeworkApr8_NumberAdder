import React from 'react';
import NumberRow from './NumberRow';
import { v4 as uuidv4 } from 'uuid';

class NumberTable extends React.Component {
    state = {
        numbers: [],
        selectedNumbers: [],
        lockedNumberIds: []
    }
    getRandomNum = () => {
        return Math.floor(Math.random() * 100) + 1;
    }
    addNum = () => {
        this.setState({ numbers: [...this.state.numbers, { id: uuidv4(), num: this.getRandomNum() }] });
    }
    onSelectClick = (id, num) => {
        const { selectedNumbers } = this.state;
        if (selectedNumbers.find(n => n.id === id)) {
            this.setState({ selectedNumbers: selectedNumbers.filter(n => n.id !== id) });
        } else {
            this.setState({ selectedNumbers: [...selectedNumbers, { id, num }] });
        }
    }
    onLockClick = (id) => {
        const { lockedNumberIds } = this.state;
        if (lockedNumberIds.includes(id)) {
            this.setState({ lockedNumberIds: lockedNumberIds.filter(i => i !== id) });
        } else {
            this.setState({ lockedNumberIds: [...lockedNumberIds, id] });
        }
    }
    render() {
        const { numbers, selectedNumbers, lockedNumberIds } = this.state;
        return (
            <>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-md-4 offset-md-4'>
                            <button onClick={this.addNum} className='btn btn-outline-success w-100'>Add</button>
                        </div>
                    </div>
                </div>
                {!numbers.length && <div className='container text-center mt-5'><h1>No Numbers Added</h1></div>}
                {!!numbers.length && <div className='container mt-5' style={{ maxHeight: 500, overflowY: 'scroll' }}>
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Add/Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {numbers.map(n => <NumberRow
                                key={n.id}
                                number={n.num}
                                onSelectClick={() => this.onSelectClick(n.id, n.num)}
                                isSelected={!selectedNumbers.find(num => num.id === n.id)}
                                isLocked={lockedNumberIds.includes(n.id)} />)}
                        </tbody>
                    </table>
                </div>}
                {!!selectedNumbers.length &&
                    <div className='container mt-5'>
                        <h1>Selected Numbers</h1>
                        <div className='col-md-6'>
                            <ul className='list-group list-group-flush'>
                                {selectedNumbers.map(n =>
                                    <li key={n.id} className='list-group-item' style={{ fontSize: 40 }}>
                                        {n.num}
                                        {'                                                                  '}
                                        <button onClick={() => this.onLockClick(n.id)}
                                            className='btn btn-outline-primary w-25'
                                            style={{ marginLeft: 50 } }                                        >
                                            {lockedNumberIds.includes(n.id) ? 'Unlock' : 'Lock'}</button>
                                    </li>)}
                            </ul>
                        </div>
                    </div >}
                )
            </>
        )
    }
}
export default NumberTable;