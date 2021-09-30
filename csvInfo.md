### products.csv
  - id, name, slogan, description, category, default_price
  - length = 6
  - entries: 1,000,011
  - 12083ms to parse
  - 7907ms to join related
  - 5074ms to clean joined related csv

### features.csv
  - id, **product_id**, feature, value
  - length = 4
  - entries: 2,219,279
  - one product can have many features
  - 8027ms to parse
  - 8867ms to reshape

### styles.csv
  - id, **productId**, name, sale_price, original_price, default_style
  - length = 7
  - entries: 1,958,102
  - one product can have many styles
  - 10096ms to parse

### photos.csv
  - id, **styleId**, url, thumbnail_url
  - entries: 5,655,656
  - id goes up to 5,655,719 because some ids are skipped
  - one style can have many photos
  - 61231ms to parse

### skus.csv
  - id, **styleId**, size, quantity
  - entries: 11,323,917
  - one style can have many skus
  - 36928ms to parse

### related.csv
  - id, **current_product_id**, related_product_id
  - entries: 4,508,263
  - one product can have many related products
  - 12779ms to parse
  - 7280ms to reshaped

## Testing for each datatype
  - varchar
    - item.length > [someNumber]
    - check if item is wrapped with double quotes
  - integer
    - check is number, isNaN(item)
  - boolean
    - typeof item === "boolean"