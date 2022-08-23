import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {

    const { modalCat, setEditCat, setModalCat } = useContext(BackContext);


    const [title, setTitle] = useState('');

    useEffect(() => {
        if (null === modalCat) {
            return;
        }
        setTitle(modalCat.title);
    }, [modalCat]);

    const handleEdit = () => {
        const data = { title, id: modalCat.id };
        setEditCat(data);
        setModalCat(null);
    }

    if (null === modalCat) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">City Changer</h5>
                        <button type="button" className="close" onClick={() => setModalCat(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                            <small className="form-text text-muted">Enter city name here.</small>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalCat(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;