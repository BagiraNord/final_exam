import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {

    const { setUpdateBasket } = useContext(BackContext);

    const handleApprove = () => {
        line.status_ID = 1;
        setUpdateBasket(line);
    }
console.log(line);
    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.title}</b>
                    <i>{line.price.toFixed(2)} EUR</i>
                    <div className="box" style={{ backgroundColor: line.in_stock ? 'coral' : null }}></div>
                    <div className="cat">{line.cat}</div>
                    {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
                    }
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleApprove}>Approve</button>
                </div>
            </div>
        </li>
    );
}

export default Line;