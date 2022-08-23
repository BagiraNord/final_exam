import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {

    const {products} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of service providers</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    products ? products.map(p => <Line key={p.id} line={p}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;