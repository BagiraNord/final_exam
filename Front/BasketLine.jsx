
function BasketLine({ line }) {



 
console.log(line);
    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.title}</b>
                    <i>{line.price.toFixed(2)} EUR</i>
                    <div className="box" style={{ backgroundColor: line.status_ID ? 'coral' : null }}>{line.status_ID ? 'Approved' : 'Not approved'}</div>
                    </div>
              
            </div>
        </li>
    );
}

export default BasketLine;