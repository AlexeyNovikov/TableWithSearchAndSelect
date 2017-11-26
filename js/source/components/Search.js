import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Компонент без состояния, можно было бы наверно реализовать функцией,
// но я решил соблюдать консистенстность, может и зря (лишнее связывание и т.д.)
class Search extends Component {
  constructor(props) {
    super(props);

    this._searchChange = this._searchChange.bind(this);
    this._startSearch = this._startSearch.bind(this);
    this._endSearch = this._endSearch.bind(this);

    // Сюда сохраняем исходные данные перед началом поиска,
    // их же и фильтруем каждый раз при изменении данных.
    this._savedData = null;
  }

  _startSearch(ev) {
    // Если фокус пришел с другого элемента, но строка поиска уже была,
    // то поиск не был завершен
    if (ev.target.value) return;
    this._savedData = this.props.data;
  }

  _endSearch(ev) {
    // Если фокус потерян, но строка еще осталась, значит поиск также не завершен
    if (ev.target.value) return;
    this._savedData = null;
  }

  _searchChange(ev) {
    const searchWord = ev.target.value.toLowerCase();
    const searchField = this.props.searchField;

    const searchedData = this._savedData.filter((row) => {
      return row[searchField].toString().toLowerCase().indexOf(searchWord) > -1 ? true : false;
    });

    // Передаем управление родителю, передав отфильтрованные данные,
    // чтобы он изменил состояние и отрисовалась таблица по новой
    this.props.onSearchChange(searchedData);
  }

  render() {
    return (
      <div>
        <input
          placeholder="Поиск"
          className="form-control form-control-sm"
          onFocus={this._startSearch}
          onChange={this._searchChange}
          onBlur={this._endSearch}
        />
      </div>
    )
  }
}

Search.propTypes = {
  searchField: PropTypes.string,
  onSearchChange: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object)
}

Search.defaultProps = {
  searchField: 'name'
}

export default Search
