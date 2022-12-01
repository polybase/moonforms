import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';

import { FormAnswers } from '../../features/types';

interface FormResponsesProps {
  questionAnswers: FormAnswers[];
}
const FormResponsesTable = ({ questionAnswers }: FormResponsesProps) => {
  const [data, setData] = useState<FormAnswers[]>(() => [
    ...questionAnswers,
  ]);
  const groupTitles = data.map(q => q.title);

  console.log(data)

  // const columnHelper = createColumnHelper<FormAnswers>();
  // const columns = []
  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <></>
    // <Table bg='dark.1' w='full' rounded='md' mb={23}>
    //   <Thead>
    //     {table.getHeaderGroups().map((headerGroup) => (
    //       <Tr key={headerGroup.id}>
    //         {headerGroup.headers.map((header) => (
    //           <Th borderBottom='none' key={header.id}>
    //             {header.isPlaceholder
    //               ? null
    //               : flexRender(
    //                   header.column.columnDef.header,
    //                   header.getContext()
    //                 )}
    //           </Th>
    //         ))}
    //       </Tr>
    //     ))}
    //   </Thead>
    //   <Tbody>
    //     {table.getRowModel().rows.map((row) => (
    //       <Tr border='none' key={row.id}>
    //         {row.getVisibleCells().map((cell) => (
    //           <Td borderBottom='none' key={cell.id}>
    //             {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //           </Td>
    //         ))}
    //       </Tr>
    //     ))}
    //   </Tbody>
    // </Table>
  );
};

export default FormResponsesTable;
