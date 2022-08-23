import { useRef } from 'react';
import { useContext, useState } from 'react';
import BackContext from '../BackContext';
import getBase64 from '../../../Functions/getBase64';

function Create() {

    const { cats, setCreateProduct, showMessage } = useContext(BackContext);

    const [title, setTitle] = useState('');
    const [spec, setSpec] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [cat, setCat] = useState('0');
    const fileInput = useRef();

    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            //tylim
        })

    }

    const handleCreate = () => {
        if (cat === '0') {
            showMessage({ text: 'Please, select city!', type: 'danger' });
            return;
        }

    const data = { 
                        title, 
                        spec,
                        price: parseFloat(price), 
                        inStock: inStock ? 1 : 0, 
                        cat: parseInt(cat),
                        photo: photoPrint
                    };
                    setCreateProduct(data);
                    setTitle('');
                    setSpec('');
                    setPrice('');
                    setInStock(false);
                    setCat('0');
                    setPhotoPrint(null);
                    fileInput.current.value = null
                    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Create new service provider</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                    <small className="form-text text-muted">Enter service providers name here.</small>
                </div>
                <div className="form-group">
                    <label>What can I do for you</label>
                    <input type="text" className="form-control" onChange={e => setSpec(e.target.value)} value={spec} />
                    <small className="form-text text-muted">Enter spcialisation here.</small>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
                    <small className="form-text text-muted">Enter price.</small>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="in--stock" checked={inStock} onChange={() => setInStock(i => !i)} />
                    <label className="form-check-label" htmlFor="in--stock">Service now available</label>
                </div>
                <div className="form-group">
                    <label>Cities</label>
                    <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
                        <option value="0">Please, select the city</option>
                        {
                            cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
                        }
                    </select>
                    <small className="form-text text-muted">Select city here.</small>
                    <label>Photo</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto}/>
                    <small className="form-text text-muted">Upload Photo</small>
                </div>
                {
                    photoPrint ? <div className="photo-bin"><img src={photoPrint} alt="img"/></div> : null
                }
                <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;