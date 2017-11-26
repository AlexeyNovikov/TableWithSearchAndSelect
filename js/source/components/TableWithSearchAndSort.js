import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import Search from './Search';
import SelectAndSort from './SelectAndSort';

class TableWithSearchAndSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.initialList
    }

    this._onSearchChange = this._onSearchChange.bind(this);
    this._onSelectChange = this._onSelectChange.bind(this);
  }

  _onSearchChange(list) {
    // Компонент Search изменился и вернул обновленные данные list,
    // обновляем состояние
    this.setState({
      list
    });
  }

  _onSelectChange(list) {
    // Компонент SelectAndSort изменился и вернул обновленные данные list,
    // обновляем состояние
    this.setState({
      list
    });
  }

  render() {
    // Возможно передать параметры сортировки компоненту SelectAndSort в объекте
    // optionsForSelect, он их отрисует и будет по ним производить сортировку, например {type: 'тип'}
    const optionsForSelect = {
      price: 'цена',
      date: 'дата'
    }
    return (
      <div>
        <div className="row">
          <div className="Search col">
            <Search
              searchField="name" // можно передать свойство объекта по которому производить поиск
              onSearchChange={this._onSearchChange}
              data={this.state.list}
            />
          </div>
          <div className="SelectAndSort col">
            <SelectAndSort
              onSelectChange={this._onSelectChange}
              options={optionsForSelect}
              data={this.state.list}
            />
          </div>
        </div>
        <div className="Table">
          <Table headers={this.props.headers} initialList={this.state.list} />
        </div>
      </div>
    )
  }
}

TableWithSearchAndSort.propTypes = {
  initialList: PropTypes.arrayOf(PropTypes.object),
  headers: PropTypes.arrayOf(PropTypes.string)
}

export default TableWithSearchAndSort
