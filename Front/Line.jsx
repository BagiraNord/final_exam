import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";

function Line({ line }) {

    const { doFilter, setAddCom, setAddBaskets } = useContext(FrontContext);

    const [com, setCom] = useState('');


    const addComment = () => {
        setAddCom({product_id: line.id, com});
        setCom('');
    }
    const addBasket = () => {
        let product_ID = +localStorage.getItem('userID');
let user_ID = line.id;
let total_sum =line.price;
        const bask = { product_ID,user_ID, total_sum} 
        console.log(bask)
         setAddBaskets(bask);
      
    }



    return (
        <li className="list-group-item">
            <div className="item front">
                <div className="content">
                    {
                        line.photo ? <div className="photo-bin"><img src={line.photo} alt={line.title} /></div> : null
                    }
                    <b>{line.title}</b>
                    <b>Specializacija: {line.spec}</b>
                    {
                        line.cur ? <i>{line.curVal} {line.cur}</i> : <i>{line.price.toFixed(2)} USD</i>
                    }

                    <div className="box" style={{ backgroundColor: line.in_stock ? 'turquoise' : null }}></div>
                    <span>{new Date(Date.parse(line.lu)).toLocaleString()}</span>
                    <div className="cat" onClick={() => doFilter(line.cid)}>{line.cat}</div>
                </div>
                <div className="comments">
                    <h5>Comments</h5>
                    <ul className="list-group">
                        {
                            line.com.map(c => <li key={c.id} className="list-group-item">{c.com}</li>)
                        }
                    </ul>
                    <div className="form-group">
                        <label>add comment</label>
                        <textarea className="form-control" rows="3" value={com} onChange={e => setCom(e.target.value)}></textarea>
                    </div>
                    <div className="frontbottoms">
                    <button type="button" className="btn btn-outline-primary" onClick={addComment}>I want to say</button>
                    <button type="button" className="order" onClick={addBasket}>Order</button>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default Line;