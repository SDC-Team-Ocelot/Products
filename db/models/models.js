const pool = require('..');

const models = {
  products: ({ page, count }, callback) => {
    let queryMessage;
    let params;
    console.log(page, count);
    if (!page && !count) {
      queryMessage = 'SELECT id, name, slogan, description, category, default_price FROM products LIMIT 5';
      pool.query(queryMessage, (err, res) => {
        callback(err, res);
      });
    } else if (!page && count) {
      queryMessage = 'SELECT id, name, slogan, description, category, default_price FROM products LIMIT $1';
      pool.query(queryMessage, [count], (err, res) => {
        callback(err, res);
      });
    } else if (page && !count) {
      params = [Number(page) * 5 - 4, Number(page) * 5]
      queryMessage = `\
        SELECT id, name, slogan, description, category, default_price\
        FROM products\
        WHERE id BETWEEN $1 AND $2\
      `;
      pool.query(queryMessage, params, (err, res) => {
        callback(err, res);
      });
    } else {
      if (count > 5) {
        params = [Number(page) * 5 - 4, Number(page) * 5 - 4 + Number(count), count]
      } else {
        params = [Number(page) * 5 - 4, Number(page) * 5, count]
      }
      queryMessage = `\
        SELECT id, name, slogan, description, category, default_price\
        FROM products\
        WHERE id BETWEEN $1 AND $2\
        LIMIT $3
      `;
      pool.query(queryMessage, params, (err, res) => {
        callback(err, res);
      });
    }
  },
  productId: (params, callback) => {
    const queryMessage = 'SELECT id, name, slogan, description, category, default_price, featuresArray FROM products WHERE id=$1';
    pool.query(queryMessage, [params], (err, res) => {
      callback(err, res)
    })
  },
  styles: (callback) => {
    // const queryMessage = 'SELECT id, name, slogan, description, category, default_price, featuresArray FROM products WHERE id=$1';
    // pool.query(queryMessage, [params], (err, res) => {
      callback(null, 'success')
    // })
  },
};

module.exports = models;