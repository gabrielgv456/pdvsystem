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
            const result = await propsItem.action(auth.idUser, propsItem.value)
            if (!result.Success) { throw new Error(result.erro) }
            propsItem.state(result.content)
            propsItem.stateOption(propsItem.option)
            handleClose()

        } catch (error: any) {
            MessageBox('error', 'Ocorreu uma falha ao buscar informações ! ' + (error.message ?? ''))
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <S.ButtonPeriod onClick={handleClick} >
                {props.selectedPeriod}<MdArrowDropDown size={9} />
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
                        selected={item.option === props.selectedPeriod}
                        onClick={() => handleAction(item)}
                        style={{fontSize:'0.65rem'}}
                    >
                        {item.option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}