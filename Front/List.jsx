import { useContext } from 'react';
import Line from './Line';
import FrontContext from './FrontContext'
import BasketLine from './BasketLine'

function List() {

    const {products, baskets} = useContext(FrontContext);
    console.log(baskets);
    console.log(products)

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of service providers</h2>
            </div>
            <div className="card-body">
            {
                    products ? products.map(b => <Line key={b.id} line={b}></Line>) : null
                    }
            </div>
            <div className="card-header">
                <h2>List of Orders</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    baskets ? baskets.map(b => <BasketLine key={b.id} line={b}></BasketLine>) : null
                    }
                </ul>
            </div>
            {/* <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.title}</b>
                    <i>{line.price.toFixed(2)} EUR</i>
                    <div className="box" style={{ backgroundColor: line.in_stock ? 'coral' : null }}></div>
                    <span>{new Date(Date.parse(line.lu)).toLocaleString()}</span>
                    <div className="cat">{line.cat}</div>
                    {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
                    }
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleApprove}>Edit</button>
                </div>
            </div>
        </li> */}
        </div>
    );
}

export default List;