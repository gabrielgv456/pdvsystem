import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { useMessageBoxContext } from '../../contexts/MessageBox/MessageBoxContext';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import * as S from './style'
import * as type from './interfaces'
import { MdArrowDropDown } from "react-icons/md";


export const MenuMui = (props: type.MenuMuiProps) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { MessageBox } = useMessageBoxContext()
    const auth = useContext(AuthContext)

    async function handleAction(propsItem: type.optionItem) {
        try {
            if (propsItem.action) {
                if (!propsItem.value) throw new Error('Para executar a ação, informe um valor.')
                const result = await propsItem.action(auth.idUser, propsItem.value)
                if (!result.Success) { throw new Error(result.erro) }
                if (propsItem.state) propsItem.state(result.content)
            }
            if (propsItem.actionGeneric) {
                await propsItem.actionGeneric()
            }
            if (propsItem.stateOption) propsItem.stateOption(propsItem.option)
            handleClose()

        } catch (error) {
            MessageBox('error', 'Ocorreu uma falha ao buscar informações ! ' + ((error as Error).message ?? ''))
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <S.ButtonPeriod onClick={handleClick} >
                {props.selected}<MdArrowDropDown size={props.sizeIcon ?? 9} />
            </S.ButtonPeriod>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 48 * 4.5,
                        width: 'min-content',
                    },
                }}
            >
                {props.options.map((item, index) => (
                    <MenuItem
                        key={item.option}
                        selected={item.option === props.selected}
                        onClick={() => handleAction(item)}
                        style={{ fontSize: '0.65rem', display: 'flex', gap: '3px' }}
                    >
                        {item.icon}
                        {item.option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}