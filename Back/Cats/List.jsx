import { useContext } from 'react';
import Line from './Line';
import BackContext from '../BackContext';

function List() {

    const {cats} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Cities</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    cats ? cats.map(cat => <Line key={cat.id} line={cat}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;