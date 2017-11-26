"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import TableWithSearchAndSort from './components/TableWithSearchAndSort';
import ex from './ex.json';

function getDataSomeWhere() {}

const tableHeaders = ['Наименование поездки', 'Время поездки', 'Тип поездки', 'Цена поездки'];
let list = getDataSomeWhere(); // получаем откуда-то информацию для таблицы

if (!list) { // если ее нет, то берем из тестового файла ex.json
  list = ex;
}

ReactDOM.render(
  <div>
    <TableWithSearchAndSort headers={tableHeaders} initialList={list} />
  </div>,
  document.getElementById('app')
);
