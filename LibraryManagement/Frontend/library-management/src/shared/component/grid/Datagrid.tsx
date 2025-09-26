import "./Datagrid.css";


interface ColumnType<T> {
    field?: keyof T;
    header?: string;
    buttonCaption?: string;
    onClick?: (i: T) => void;
}

interface DataGridProps<T> {
    data: T[];
    columns: ColumnType<T>[];
}

export default function Datagrid<T>(props: DataGridProps<T>) {
    let sequence = 0;
    let columnSequence = 0;
    return(
        <table className="data-grid">
            <thead>
                <tr>
                    {props.columns
                    .filter((x) => x.field || x.buttonCaption)
                    .map((c) => {
                        return <th key ={++columnSequence}>{c.header}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
               {
                props.data.map((item) => {
                    return (
                        <tr key={++sequence}>
                            {props.columns.map((col) => {
                                if (col.field) {
                                    return (
                                        <td key = {++columnSequence}>{item[col.field] as string}</td>
                                    );
                                } else if (col.buttonCaption) {
                                    return (
                                        <td key={++columnSequence}>
                                            <button
                                            onClick={() => {
                                                col.onClick?.(item);
                                            }}
                                            >{col.buttonCaption}
                                            </button>
                                        </td>
                                    );
                                }
                            })}
                        </tr>
                    );
                })
               }
            </tbody>
        </table>
    );
}