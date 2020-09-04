import React from 'react';
import styles from './style.m.scss';

export const CellValue = ({ value, isCode }) => {
  if (value === null)
    return <code className={styles.cellValue}>NULL</code>;
  if (typeof value === 'number')
    return <code className={styles.cellValue}>{value}</code>;
  if (value === true || value === false)
    return <code className={styles[value.toString()]}>{value.toString().toUpperCase()}</code>;
  if (isCode) {
    return (<code>{value}</code>);
  }
  return <>{String(value)}</>;
    // DISABLE! Performance issues here
    // return <span>
    //   {
    //     value.replace(this.state.filtered[r.column.id].regex || this.state.filtered[r.column.id].value, '<###>$1<###>')
    //     .split('<###>')
    //     .map((str, i) => {
    //       if (i % 2 === 1)
    //         return (
    //           <mark key={i} className="filter-highlight">
    //             {str}
    //           </mark>
    //         );
    //       if (str.trim().length === 0) return null;
    //       return <span key={i}>{str}</span>;
    //     })
    //   }
    // </span>
};

export default CellValue;