import Nav from '../Nav';
import Create from './Create';
import Edit from './Edit';
import List from './List';
function Crud() {
    return (
        <>
        <Nav/>
        <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Create />
                    </div>
                    <div className="col-8">
                        <List/>
                    </div>
                </div>
            </div>
            <Edit/>
        </>
        
    )
}
export default Crud;