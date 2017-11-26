import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.initialList
    }
  }

  componentWillReceiveProps(nextProps) {
    // Данные обновились, теперь нужно перерисовать таблицу
    this.setState({
      list: nextProps.initialList
    })
  }

  render() {
    return (
      <table className="table table-sm">
        <thead className="thead-light">
          <tr>
            {this.props.headers.map((header, index) => {
              return <th key={index}>{header}</th>
            })}
          </tr>
        </thead>
        <tbody>
         {this.state.list.map((row, rowIndex) => {
           return (
             <tr key={rowIndex}>
               {Object.keys(row).map((cell, cellIndex) => {
                 return <td key={cellIndex}>{row[cell]}</td>
               })}
             </tr>
           )
         })}
        </tbody>
      </table>
    )
  }
}

Table.propTypes = {
  initialList: PropTypes.arrayOf(PropTypes.object),
  headers: PropTypes.arrayOf(PropTypes.string)
}

export default Table
