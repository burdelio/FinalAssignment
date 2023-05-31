import { Empty, Table, Badge } from 'antd';
import EditableCell from './EditableCell';
import EditableRow from './EditableRow';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const DynamicTableContent = ({ dataSource, columns, handleCellSave }) => {
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    };

    // for setting onCell - passing props per cell of this column
    const mappedCols = columns.map((col) => {
        let render = col.render ?? undefined;
        if (col.type == 'bool') {
            render = (text, record) => {
                return (<>
                    {text ? <CheckOutlined /> : <CloseOutlined />}
                </>);
            }
        }

        if (col.title === "ID") {
            render = (text) => {
                return <Badge count={text} />;
            };
        }

        if (!col.editable) {
            return {
                ...col,
                render: render,
                onCell: (record) => ({
                    record,
                    rowScope: col.rowScope
                })
            };
        }

        return {
            ...col,
            render: render,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleCellSave
            })
        };
    });

    return (
        <div>
            <Table
                locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Fill the form" /> }}
                components={components}
                rowClassName={() => "editable-row"}
                bordered
                sticky
                dataSource={dataSource}
                columns={mappedCols}
                style={{ maxWidth: '90%', margin: 'auto' }}
                pagination={false}
                scroll={{ x: true }}
            />
        </div>
    );
};

export default DynamicTableContent;