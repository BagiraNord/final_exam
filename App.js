const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "service_shop",
});

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/admin')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 'admin') {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    // console.log(results)
                    next();
                }
            }
        );
    }
}
app.use(doAuth)

// AUTH
app.get("/login-check", (req, res) => {
    let sql;
    let requests;

    if (req.query.role === 'admin') {
        sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ? AND role = ?
        `;
        requests = [req.headers['authorization'] || '', req.query.role];
    } else {
        sql = `
        SELECT
        name, role, id
        FROM users
        WHERE session = ?
        `;
        requests = [req.headers['authorization'] || ''];
    }
    con.query(sql, requests, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error' });
        } else {
            
            res.send({ msg: 'ok', result });
        }
    });
});


app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            console.log(req.body)
            res.send({ msg: 'ok', key });
        }
    });
});


// CATS
app.post("/admin/cats", (req, res) => {
    const sql = `
    INSERT INTO cats
    (title)
    VALUES (?)
    `;
    con.query(sql, [req.body.title], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new City was added', type: 'success' } });
    });
});

app.get("/admin/cats", (req, res) => {
    const sql = `
  SELECT *
  FROM cats
  ORDER BY title
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/admin/cats/:id", (req, res) => {
    const sql = `
    DELETE FROM cats
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
    });
});

app.put("/admin/cats/:id", (req, res) => {
    const sql = `
    UPDATE cats
    SET title = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.title, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, City updated.', type: 'success' } });
    });
});


// Products
app.post("/admin/products", (req, res) => {
    const sql = `
    INSERT INTO products
    (title, spec, price, in_stock, cats_id, photo)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.spec, req.body.price, req.body.inStock, req.body.cat, req.body.photo], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new tremendous service provider was added', type: 'success' } });
    });
});

app.get("/admin/products", (req, res) => {
    const sql = `
  SELECT p.id, price, spec, p.title, c.title AS cat, in_stock, last_update AS lu, photo
  FROM products AS p
  LEFT JOIN cats AS c
  ON c.id = p.cats_id
  ORDER BY title
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



app.delete("/admin/products/:id", (req, res) => {
    const sql = `
    DELETE FROM products
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, service provider is gone', type: 'success' } });
    });
});

app.put("/admin/products/:id", (req, res) => {
    const sql = `
    UPDATE products
    SET title = ?, spec = ?, price = ?, last_update = ?, cats_id = ?, in_stock = ?, photo = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.title, req.body.spec, req.body.price, req.body.lu, req.body.cat, req.body.in_stock, req.body.photo, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, profile updated.', type: 'success' } });
    });
});

app.delete("/admin/photos/:id", (req, res) => {
    const sql = `
    UPDATE products
    SET photo = null
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, photo gone. Have a nice day.', type: 'success' } });
    });
});

// Order
app.post("/order", (req, res) => {
    const sql = `
    INSERT INTO baskets
    ( user_ID, product_ID, status_ID, total_sum)
    VALUES (?, ?, 0, ?)
    `;
    con.query(sql, [req.body.user_ID, req.body.product_ID, req.body.total_sum], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new order was made', type: 'success' } });
    });
});

app.get("/admin/baskets", (req, res) => {
    const sql = `
  SELECT p.title, b.id, b.user_ID, b.product_ID, p.id, p.price, u.id, u.name, b.status_ID
  FROM baskets AS b
  LEFT JOIN products AS p
  ON p.id = b.product_ID
  LEFT JOIN users AS u
  ON u.id = b.user_ID
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.put("/admin/baskets/:id", (req, res) => {
    const sql = `
    UPDATE baskets
    SET status_ID = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.status_ID, req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Order updated.', type: 'success' } });
    });
});

app.delete("/admin/photos/:id", (req, res) => {
    const sql = `
    UPDATE products
    SET photo = null
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, photo gone. Have a nice day.', type: 'success' } });
    });
});



// FRONT

app.get("/products", (req, res) => {
    let sql;
    let requests;
    console.log(req.query['cat-id']);
    if (!req.query['cat-id'] && !req.query['s']) {
        sql = `
        SELECT p.id, c.id AS cid, price, p.title, spec, c.title AS cat, in_stock, last_update AS lu, photo
        FROM products AS p
        LEFT JOIN cats AS c
        ON c.id = p.cats_id
        ORDER BY title
        `;
        requests = [];
    } else if (req.query['cat-id']) {
        sql = `
        SELECT p.id, c.id AS cid, price, p.title, spec, c.title AS cat, in_stock, last_update AS lu, photo
        FROM products AS p
        LEFT JOIN cats AS c
        ON c.id = p.cats_id
        WHERE p.cats_id = ?
        ORDER BY title
        `;
        requests = [req.query['cat-id']];
    } else {
        sql = `
        SELECT p.id, c.id AS cid, price, p.title, spec, c.title AS cat, in_stock, last_update AS lu, photo
        FROM products AS p
        LEFT JOIN cats AS c
        ON c.id = p.cats_id
        WHERE p.title LIKE ? 
        ORDER BY title
        `;
        requests = ['%' + req.query['s'] + '%'];
    }
    con.query(sql, requests, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.get("/cats", (req, res) => {
    const sql = `
  SELECT *
  FROM cats
  ORDER BY title
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/baskets", (req, res) => {
    const sql = `
  SELECT b.id, b.user_ID, b.product_ID, p.id, p.title,  p.price, u.id, u.name, b.status_ID
  FROM baskets AS b
  LEFT JOIN products AS p
  ON p.id = b.product_ID
  LEFT JOIN users AS u
  ON u.id = b.user_ID
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// Comments
app.post("/comments", (req, res) => {
    const sql = `
    INSERT INTO comments
    (com, product_id)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.com, req.body.product_id, ], (err, result) => {
        if (err) throw err;
        res.send({ result });
    });
});
app.get("/admin/comments", (req, res) => {
    const sql = `
  SELECT com.id AS id, com, title
  FROM comments AS com
  INNER JOIN
  products AS p
  ON com.product_id = p.id
  ORDER BY p.title
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete("/admin/comments/:id", (req, res) => {
    const sql = `
    DELETE FROM comments
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Stupid comment gone', type: 'success' } });
    });
});


//cur
app.post("/admin/cur", (req, res) => {
    let val = '';
    for (const o in req.body.data) {
        console.log(req.body.data[o]);
        val += `('${req.body.data[o].code}', ${req.body.data[o].value}),`
    }
    val = val.slice(0, -1);
    const sql = `
    INSERT INTO cur
    /* this is a multiple-line comment */
    (code, value)
    VALUES ${val}
    ON DUPLICATE KEY UPDATE 
    value = VALUES(value)
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send({ result });
    });
});

app.get("/cur", (req, res) => {
    const sql = `
  SELECT *
  FROM cur
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Meistras klauso porto Nr ${port}`);
});
