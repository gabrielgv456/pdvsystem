import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { DefaultButton } from '../buttons/defaultButton'
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Deliveries, DeliveriesReturnApiProps } from '../../pages/Deliveries';
import { DeliveryAddressClient } from '../../pages/Sell/Modals/CheckOut/Components/AddressClient';
import { useMessageBoxContext } from '../../contexts/MessageBox/MessageBoxContext';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { GeneratePDFDeliveryList } from '../../hooks/useGeneratePDF';
import { User } from '../../types/User';

interface Data {
  itemSell: string
  sell: string,
  client: string,
  address: string,
  product: string,
  scheduledDate: string
}
interface MuiTableProps {
  width: string
  Deliveries: DeliveriesReturnApiProps[],
  rows: Data[],
  searchDeliveries: () => void
  type: 'Pending' | 'Shipping' | 'Done'
}
function createData(
  itemSell: string,
  sell: string,
  client: string,
  address: string,
  product: string,
  scheduledDate: string
): Data {
  return {
    itemSell,
    sell,
    client,
    address,
    product,
    scheduledDate
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'sell',
    numeric: false,
    disablePadding: true,
    label: 'Venda',
  },
  {
    id: 'product',
    numeric: false,
    disablePadding: true,
    label: 'Produto'
  },
  {
    id: 'client',
    numeric: false,
    disablePadding: true,
    label: 'Cliente',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: true,
    label: 'Endereço',
  },
  {
    id: 'scheduledDate',
    numeric: false,
    disablePadding: true,
    label: 'Data agendada',
  }
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly string[]
  searchDeliveries: () => void
  typeDelivery: 'Pending' | 'Done' | 'Shipping'
  deliveries: DeliveriesReturnApiProps[]
  user : User | null
}

export interface TypeChangeStatusDeliveriesRequest {
  storeId: number,
  itensSellToChange: number[],
  newStatus: 'Pending' | 'Shipping' | 'Done',
}


function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const { changeStatusDeliveries } = useApi()
  const { MessageBox } = useMessageBoxContext()
  const { idUser } = React.useContext(AuthContext)
  const itensSelected = props.selected.map(item => parseInt(item))
  const deliveriesFiltered = props.deliveries.filter(delivery => itensSelected.includes(delivery.itemSell.id)); // Filter selected deliveries

  async function handleChangeStatusDelivery(newStatus: 'Pending' | 'Shipping' | 'Done') {
    try {
      const dataChangeStatus = await changeStatusDeliveries({ storeId: idUser, itensSellToChange: itensSelected, newStatus })
      if (!dataChangeStatus.Success) {
        throw new Error(dataChangeStatus.Erro)
      }
      MessageBox('success', `Status da(s) entrega(s) atualizado com sucesso! ${newStatus === 'Shipping' ? 'Roteiro Impresso': ''}`)
      GeneratePDFDeliveryList(deliveriesFiltered,props.user?.name ?? '')
      props.searchDeliveries()
    } catch (error: any) {
      MessageBox('error', 'Falha ao atualizar status da entrega! ' + error.message)
    }
  }

  async function handleDeliveryListPrint(){
    GeneratePDFDeliveryList(deliveriesFiltered,props.user?.name ?? '')
  }

  return (
    <>
      {numSelected > 0 && (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selecionado(s)
            </Typography>
          ) : (''
            // <Typography
            //   sx={{ flex: '1 1 100%' }}
            //   variant="h6"
            //   id="tableTitle"
            //   component="div"
            // >
            //   Entregas
            // </Typography>
          )}
          {numSelected > 0 ? (
            //<Tooltip title="Realizar entrega">
            <section style={{ display: 'flex', gap: 5 }}>
              {props.typeDelivery === 'Pending' &&
                <>
                  <DefaultButton selectedColor='--Green' onClick={() => handleChangeStatusDelivery('Shipping')}>
                    Iniciar Entrega
                  </DefaultButton>
                  <DefaultButton selectedColor='--Gold'  >
                    Editar
                  </DefaultButton>
                </>
              }
              {props.typeDelivery === 'Shipping' &&
                <>
                  <DefaultButton selectedColor='--Blue' onClick={() => handleChangeStatusDelivery('Done')}>
                    Concluir
                  </DefaultButton>
                  <DefaultButton selectedColor='--Orange' onClick={() => handleDeliveryListPrint()}>
                    Imprimrir Roteiro
                  </DefaultButton>
                </>
              }
              {/* {props.typeDelivery === 'Pending' &&
                
              } */}
              {/* <DefaultButton selectedColor='--Red'>
                Cancelar
              </DefaultButton> */}

            </section>
            //      <DeleteIcon /> 
            // </Tooltip>
          ) : (
            ''
            // <Tooltip title="Filter list">
            //   <IconButton>
            //     <FilterListIcon />
            //   </IconButton>
            // </Tooltip>
          )}
        </Toolbar >)
      }
    </>
  );
}



export default function MuiTableDeliveries(props: MuiTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('itemSell');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {user} = React.useContext(AuthContext)
 

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.itemSell);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(props.rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage],
  );



  return (
    <Box sx={{ width: props.width }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          searchDeliveries={props.searchDeliveries}
          typeDelivery={props.type}
          deliveries={props.Deliveries} 
          user={user}
          />
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.itemSell);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.itemSell)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.itemSell}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}

                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.sell}
                    </TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.client}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.scheduledDate}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Linhas por página:'
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Comprimir"
      />
    </Box>
  );
}