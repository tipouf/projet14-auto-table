import { useState } from 'react'
import './Table.scss'

type TableList = {
    [key: string]: string;
}
  
type Order = { [key: string]: 'asc' | 'desc' | null };

type columnsPropsType = {
  displayHeader?: boolean
  displaySearch?: boolean
  displayPagination?: boolean
  displayPageSize?: boolean
  numberByPage?: [number?, number?, number?, number?, number?]
}
  
export const Table = ( { list, extraProps = {} as columnsPropsType }: { list: TableList[], extraProps?: Partial<columnsPropsType> }) => {
    const defaultExtraProps = {
      displayHeader: true,
      displaySearch: true,
      displayPagination: true,
      displayPageSize: true,
      numberByPage: [10, 20, 50, 100]
    };

    const mergedExtraProps = { ...defaultExtraProps, ...extraProps };

    const displayPageSize = mergedExtraProps.displayPagination ? mergedExtraProps.displayPageSize : false;
    
      const [order, setOrder] = useState<Order>(() => {
        const orderObj: Order = {};
        if (list.length > 0) {
          Object.keys(list[0]).forEach(key => {
            orderObj[key] = null;
          });
        }
        return orderObj;
      });
    
      const [tableList, setTableList] = useState<TableList[]>(list);
      const [search, setSearch] = useState<string>('');
      const [lastClickedKey, setLastClickedKey] = useState<string | null>(null);
      const [pageSize, setPageSize] = useState<number>(displayPageSize ? (mergedExtraProps.numberByPage[0]??10) : list.length);
      const [currentPage, setCurrentPage] = useState(1);
    

      const handleSort = (key: string) => {
        const sortedList = [...tableList].sort((a, b) => {
          if (order[key] === 'asc') {
            return a[key] < b[key] ? -1 : 1;
          }
          return a[key] > b[key] ? -1 : 1;
        });
        setTableList(sortedList);
        setOrder((prevOrder) => ({
          ...prevOrder,
          [key]: prevOrder[key] === 'asc' ? 'desc' : 'asc',
        }));
        setLastClickedKey(key);
      };
    
      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearch(value);
        setCurrentPage(1);
      };
    
      const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setPageSize(Number(value));
        setCurrentPage(1);
      };
    
      const handlePageChange = (page: number) => {
        setCurrentPage(page);
      };
    
      const filteredList = tableList.filter((employee) => {
        return Object.values(employee).some((value) =>
          String(value)
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(
              search
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
            )
        );
      });
    
      const pageCount = Math.ceil(filteredList.length / pageSize);
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize - 1, filteredList.length - 1);
      const currentPageList = filteredList.slice(startIndex, endIndex + 1);
    
      const showResult = filteredList.length > 0;
    
      return (
        <div className="table">
          {mergedExtraProps.displayHeader &&
          <div className="top-container">
            {displayPageSize &&
            <div className="page-size-container">
            <span>Page size: </span>
            <select value={pageSize} onChange={handlePageSizeChange} className="form-input">
              {mergedExtraProps.numberByPage?.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
}         {mergedExtraProps.displaySearch &&
          <input type="text" value={search} onChange={handleSearch} placeholder="Search" className="form-input search" />
        }
          </div>
          }
          {!showResult ? (
            <p className="no-result">No result</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {Object.keys(order).map((key) => (
                    <th key={key} onClick={() => handleSort(key)} >
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, match => match.toUpperCase())} {key === lastClickedKey ? (order[key] === 'asc' ? <><span>&#9660;</span><span className='disabled'>&#9650;</span></> : <><span className='disabled'>&#9660;</span><span>&#9650;</span></>) : <><span className='disabled'>&#9660;</span><span className='disabled'>&#9650;</span></>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {currentPageList.map((employee, index) => (
                <tr key={index}>
                  {Object.keys(employee).map((key) => (
                    <td key={key}>{employee[key]}</td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>
          )}
          {showResult && mergedExtraProps.displayPagination && (
            <div className="pagination-container">
              <span className="page-info">Page {currentPage} of {pageCount} - {filteredList.length ? filteredList.length : tableList.length} items</span>

              <div className="page-number-container">
                {currentPage > 1 && (
                  <button
                    className="previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                )}
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    key={index + 1}
                    className={currentPage === index + 1 ? 'active' : ''}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                {currentPage < pageCount && (
                  <button
                    className="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )
    }
    

