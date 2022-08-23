import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {

    const {baskets} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Orders</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    baskets ? baskets.map(b => <Line key={b.id} line={b}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;