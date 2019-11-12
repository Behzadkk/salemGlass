import React from "react";
import Select from "react-select";

class ProductSelect extends React.Component {
  state = {
    selectedOption: null,
    isLoading: true,
    categories: []
  };

  componentDidMount() {
    fetch("/api/products")
      .then(res => res.json())
      .then(res => {
        const options = res.products.map(item => {
          return { value: item.prodId, label: item.name };
        });
        this.setState({ isLoading: false, categories: options });
      });
  }

  handleChange = selectedOption => {
    if (selectedOption)
      this.setState({ selectedOption }, () =>
        this.props.selectProducts(selectedOption)
      );
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div className='form-group row justify-content-between'>
        <label className='my-2 mx-3' htmlFor='selector'>
          Select related products
        </label>
        <div className='col-sm-9'>
          {!this.state.isLoading && (
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={this.state.categories}
              isMulti
              placeholder='Select related products'
            />
          )}
        </div>
      </div>
    );
  }
}

export default ProductSelect;
