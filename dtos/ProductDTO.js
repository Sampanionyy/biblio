class ProductDTO {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category ? { id: category.id, name: category.name } : null;
  }
}
module.exports = ProductDTO;
