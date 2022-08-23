import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {

    const { setDeleteProduct, setModalProduct } = useContext(BackContext);

    const handleDelete = () => {
        setDeleteProduct(line);
    }

    const handleEdit = () => {
        setModalProduct(line);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
                    }
                    <b>{line.title}</b>
                    <b>Specializacija: {line.spec}</b>
                    <i>{line.price.toFixed(2)} EUR</i>
                    <div className="box" style={{ backgroundColor: line.in_stock ? 'coral' : null }}></div>
                    <span>{new Date(Date.parse(line.lu)).toLocaleString()}</span>
                    <div className="cat">{line.cat}</div>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Line;