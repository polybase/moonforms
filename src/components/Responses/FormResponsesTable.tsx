import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { QuestionAnswer } from '../../features/types';

interface FormResponsesProps {
  questionAnswers: QuestionAnswer[];
}

const FormResponsesTable = ({ questionAnswers }: FormResponsesProps) => {
  const [data, setData] = useState<QuestionAnswer[]>(() => [
    ...questionAnswers,
  ]);

  const columnHelper = createColumnHelper<QuestionAnswer>();
  const columns = [
    columnHelper.accessor((row) => row.data, {
      id: 'data',
      header: () => (
        <Text as='span' color='white'>
          Answers
        </Text>
      ),
      cell: (info) => (
        <Text color='gray.400'>
          {info.getValue() !== '' ? info.getValue() : 'N/A'}
        </Text>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table bg='dark.1' w='full' rounded='md' mb={23}>
      <Tbody>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th borderBottom='none' key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        {table.getRowModel().rows.map((row) => (
          <Tr border='none' key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Td borderBottom='none' key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default FormResponsesTable;
