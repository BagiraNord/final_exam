import { useRef } from "react";
import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";
import getBase64 from "../../../Functions/getBase64";

function Edit() {

    const { cats, modalProduct, setEditProduct, setModalProduct, setDeletePhoto } = useContext(BackContext);


    const [title, setTitle] = useState('');
    const [spec, setSpec] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState(false);
    const [cat, setCat] = useState('0');
    const [lu, setLu] = useState('');
    const fileInput = useRef();
    const [photoPrint, setPhotoPrint] = useState(null);


    const setDateFormat = d => {
        //yyyy-MM-ddThh:mm
        const date = new Date(Date.parse(d));
        const y = date.getFullYear();
        const m = ('' + (date.getMonth() + 1)).padStart(2, '0');
        const day = ('' + date.getDate()).padStart(2, '0');
        const h = ('' + date.getHours()).padStart(2, '0');
        const min = ('' + date.getMinutes()).padStart(2, '0');
        const out = y + '-' + m + '-' + day + 'T' + h + ':' + min;
        return out;
    }

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            //tylim
        })
    }
    const handleDeletePhoto = () => {
        setDeletePhoto({id: modalProduct.id});
        setModalProduct(p => ({...p, photo: null}));
    }
    useEffect(() => {
        if (null === modalProduct) {
            return;
        }
        setTitle(modalProduct.title);
        setSpec(modalProduct.spec);
        setPrice(modalProduct.price);
        setLu(setDateFormat(modalProduct.lu));
        setInStock(modalProduct.in_stock ? true : false);
        setCat(cats.filter(c => c.title === modalProduct.cat)[0].id);
        setPhotoPrint(modalProduct.photo);
    }, [modalProduct, cats]);

    const handleEdit = () => {
        const data = { 
            title,
            spec, 
            id: modalProduct.id,
            in_stock: inStock ? 1 : 0,
            price: parseFloat(price),
            cat: parseInt(cat),
            lu: lu,
            photo: photoPrint
         };
        setEditProduct(data);
        setModalProduct(null);
    }

    if (null === modalProduct) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Service Changer</h5>
                        <button type="button" className="close" onClick={() => setModalProduct(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                            <small className="form-text text-muted">Enter city here.</small>
                        </div>
                        <div className="form-group">
                            <label>Specialisation</label>
                            <input type="text" className="form-control" onChange={e => setSpec(e.target.value)} value={spec} />
                            <small className="form-text text-muted">Enter specialisation here.</small>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
                            <small className="form-text text-muted">Enter price.</small>
                        </div>
                        <div className="form-group">
                            <label>Date</label>
                            <input type="datetime-local" className="form-control" onChange={e => setLu(e.target.value)} value={lu} />
                            <small className="form-text text-muted">Enter Date.</small>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="in--stock--modal" checked={inStock} onChange={() => setInStock(i => !i)} />
                            <label className="form-check-label" htmlFor="in--stock--modal">In stock</label>
                        </div>
                        <div className="form-group">
                            <label>Cities</label>
                            <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
                                <option value="0">Please, select your city</option>
                                {
                                    cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
                                }
                            </select>
                            <small className="form-text text-muted">Select city here.</small>
                        </div>
                        <div className="form-group">
                            <label>Photo</label>
                            <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                            <small className="form-text text-muted">Upload Photo.</small>
                        </div>
                        {
                            photoPrint ? <div className="photo-bin"><img src={photoPrint} alt="nice" /></div> : null
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalProduct(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove Photo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;