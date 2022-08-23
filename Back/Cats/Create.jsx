import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {

    const { setCreateCat } = useContext(BackContext);

    const [title, setTitle] = useState('');

    const handleCreate = () => {
        const data = { title };
        setCreateCat(data);
        setTitle('');
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Add new city</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                    <small className="form-text text-muted">Enter city here.</small>
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;