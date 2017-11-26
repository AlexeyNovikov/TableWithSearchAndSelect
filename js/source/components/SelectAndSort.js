import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Компонент без состояния, можно было бы наверно реализовать функцией,
// но я решил соблюдать консистенстность, может и зря (лишнее связывание и т.д.)
class SelectAndSort extends Component {
  constructor(props) {
    super(props);

    this._makeOptionsList = this._makeOptionsList.bind(this);
    this._selectChange = this._selectChange.bind(this);
    this._sortData = this._sortData.bind(this);

    this._sortedData = null;
  }

  _sortData(data, field, direction) {
    // Здесь просто функция сортировки дынных, в зависимости от свойства объекта,
    // по которому нужно сортировать и направления сортировки (убывание, возрастание)
    switch (field) {
      case 'price': {
        this._sortedData = data.sort((a, b) => {
          if (direction === 'down') {
            return Number(b[field]) - Number(a[field]);
          } else if (direction === 'up') {
            return Number(a[field]) - Number(b[field]);
          } else {
            console.log('Check out SelectAndSort module for the options values');
          }
        });
        break;
      }
      case 'date': {
        this._sortedData = data.sort((a, b) => {
          if (direction === 'down') {
            return Date.parse(b[field]) - Date.parse(a[field]);
          } else if (direction === 'up') {
            return Date.parse(a[field]) - Date.parse(b[field]);
          } else {
            console.log('Check out SelectAndSort module for the options values');
          }
        });
        break;
      }
      default: {
        this._sortedData = data.sort((a, b) => {
          if (direction === 'down') {
            return a[field] < b[field] ? 1 : -1;
          } else if (direction === 'up') {
            return a[field] > b[field] ? 1 : -1;
          } else {
            console.log('Check out SelectAndSort module for the options values');
          }
        });
      }
    }
  }

  _selectChange(ev) {
    let [field, direction] = ev.target.value.split('-');

    this._sortData(this.props.data, field, direction);

    // После того как данные отсортированы, вызываем коллбэк, переданый родителем,
    // с отсортированными данными
    this.props.onSelectChange(this._sortedData);
  }

  _makeOptionsList() {
    let list = [];

    Object.keys(this.props.options).forEach((field, index) => {
      // Ставим значение value для каждого узла option определяющее по какому свойству
      // объекта производить сортировку и направлению сортировки
      list.push(<option key={index} value={field + '-down'}>{this.props.options[field]} по убыванию</option>);
      list.push(<option key={index + '.5'} value={field + '-up'}>{this.props.options[field]} по возрастанию</option>);
    });

    return list;
  }

  render() {
    return (
      <div>
        <select
          className="form-control form-control-sm"
          ref="selectElem"
          defaultValue="sort"
          onChange={this._selectChange}
        >
          <option disabled value="sort">cортировка</option>
          {this._makeOptionsList()}
        </select>
      </div>
    )
  }
}

SelectAndSort.propTypes = {
  options: PropTypes.object,
  onSelectChange: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object)
}

export default SelectAndSort
