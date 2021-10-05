const pool = require('..');

const models = {
  products: async ({ page, count }) => {
    let queryMessage;
    let params;
    let results;
    if (!page && !count) {
      queryMessage = 'SELECT id, name, slogan, description, category, default_price FROM products LIMIT 5';
      results = await pool.query(queryMessage);
    } else if (!page && count) {
      queryMessage = 'SELECT id, name, slogan, description, category, default_price FROM products LIMIT $1';
      results = await pool.query(queryMessage, [count]);
    } else if (page && !count) {
      params = [Number(page) * 5 - 4, Number(page) * 5];
      queryMessage = `
        SELECT id, name, slogan, description, category, default_price
        FROM products
        WHERE id BETWEEN $1 AND $2
      `;
      results = await pool.query(queryMessage, params);
    } else {
      if (count > 5) {
        params = [Number(page) * 5 - 4, Number(page) * 5 - 4 + Number(count), count];
      } else {
        params = [Number(page) * 5 - 4, Number(page) * 5, count];
      }
      queryMessage = `
        SELECT id, name, slogan, description, category, default_price
        FROM products
        WHERE id BETWEEN $1 AND $2
        LIMIT $3
      `;
      results = await pool.query(queryMessage, params);
    }
    return results;
  },
  productId: async (params) => {
    const queryMessage = 'SELECT id, name, slogan, description, category, default_price, featuresArray FROM products WHERE id=$1';
    const results = await pool.query(queryMessage, [params]);
    return results;
  },
  styles: async (params) => {
    const queryMessage = `
      SELECT
        s.style_id, s.name, s.original_price, s.sale_price,
        s.default_style AS "default?",
        CASE WHEN count(ps) = 0
          THEN ARRAY[]::json[]
          ELSE array_agg(ps.photos)
        END AS photos,
        CASE WHEN count(sku) = 0
          THEN '{}'::json
          ELSE json_object_agg(sku.id, sku.sk)
          FILTER (WHERE sku.id IS NOT NULL)
        END AS skus
      FROM styles s
      LEFT JOIN (
        SELECT
          skus.style_id,
          skus.id,
          json_build_object('quantity', quantity, 'size', size) AS sk
        FROM skus
      ) sku
      ON s.style_id = sku.style_id
      LEFT JOIN (
        SELECT
          photos.style_id,
          json_build_object('url', photos.url,'thumbnail_url', photos.thumbnail_url) AS photos
        FROM photos
      ) ps
      ON s.style_id = ps.style_id
      WHERE s.product_id = $1
      GROUP BY s.style_id
      ORDER BY s.style_id ASC
    `;
    const results = await pool.query(queryMessage, [params]);
    return results;
  },
  related: async (params) => {
    const queryMessage = 'SELECT relatedarray FROM products WHERE id=$1';
    const results = await pool.query(queryMessage, [params]);
    return results;
  },
};

module.exports = models;
