import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const TestingTable = () => {
  const data = [
    {
      title: 'what is your name',
      responses: ['miguel', 'alejandro'],
    },
    {
      title: 'how old are you',
      responses: ['12', '14'],
    },
  ];
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          {data.map((value, index) => {
            return (
              <Tr key={`title_${index}`}>
                <Th>{value.title}</Th>
              </Tr>
            );
          })}
        </Thead>
        <Tbody>
          {data.map((value, index) => {
            return value.responses.map((data, j) => (
              <Tr key={`response_${j}`}>
                <Td>{data}</Td>
              </Tr>
            ));
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TestingTable;
