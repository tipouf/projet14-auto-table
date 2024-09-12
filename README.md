# REACT-AUTO-TABLE-TS

=====================================

## Table of Contents

-----------------

* [Installation](#installation)

* [Usage](#usage)

* [Props](#props)

* [Extra Props](#extra-props)

* [Result](#result)

### Installation

---------------

To install the package, use the following command:

```bash

npm i react-auto-table-ts

```

### Usage

-----

To use the package, import the `Table` component and pass in a list of data:

```javascript

import { Table } from 'react-auto-table-ts';

const data = [

  {

    "firstName": "Ava",

    "lastName": "Hall",

    "dateOfBirth": "1985-03-15",

    "startDate": "2020-08-01",

    "street": "1234 Main St",

    "city": "Springfield",

    "state": "IL",

    "zipCode": "62701",

    "department": "Sales"

  },

  {

    "firstName": "Liam",

    "lastName": "Brown",

    "dateOfBirth": "1992-05-03",

    "startDate": "2020-04-01",

    "street": "5678 Oak St",

    "city": "Decatur",

    "state": "IL",

    "zipCode": "62523",

    "department": "Marketing"

  }

];

<Table list={data} />

```

### Props

-----

The `Table` component accepts the following props:

* `list`: an array of objects (required)

* `extraProps`: an object with optional properties (see below)

### Extra Props

-------------

The `extraProps` object can contain the following properties:

* `displayHeader`: a boolean indicating whether to display the header (default: true)

* `displaySearch`: a boolean indicating whether to display the search bar (default: true)

* `displayPagination`: a boolean indicating whether to display pagination (default: true)
  (note: if displayPagination is set to false, all data will be display on the same page and the numberByPage selector will be removed)

* `displayPageSize`: a boolean indicating whether to display selector of number by page (default: true)

* `numberByPage`: an array of numbers indicating the number of items to display per page (default: [10, 20, 50, 100])

Example:

```javascript

extraProps={{

  displayHeader: false,

  displaySearch: false,

  displayPagination: false,

  numberByPage: [10, 20, 30]

}}

```

### Result

-----

The resulting table will display the data in a tabular format without extraProps

![alt text](https://github.com/tipouf/projet14-auto-table/blob/npm-autotable/image.png?raw=true)