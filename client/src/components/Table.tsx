// import React from 'react'

// const Table = ({ columns, renderRow, data }: 
//     { columns: { header: string, accessor: string, className?: string }[], 
//     renderRow: (item: any) => React.ReactNode, 
//     data: any[] }) => {
    
//   return (
//     <table className='w-full mt-4'>
//      <thead>
//         <tr className='text-left text-gray-700 text-sm my-2'>
//             {columns.map((col)=>(
//                 <th key={col.accessor} className={col.className}>{col.header}</th>
//             ))}
//         </tr>
//      </thead>
//      <tbody>{data.map((item)=>renderRow(item))}</tbody>
//     </table>
//   )
// }

// export default Table
import React from 'react';

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface TableProps<T> {
  columns: Column[];
  renderRow: (item: T) => React.ReactNode;
  data: T[];
}

const Table = <T extends { [key: string]: any }>({
  columns,
  renderRow,
  data,
}: TableProps<T>) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-700 text-sm my-2">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
