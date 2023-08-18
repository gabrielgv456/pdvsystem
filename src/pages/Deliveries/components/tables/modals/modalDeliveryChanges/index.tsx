import Modal from '@mui/material/Modal';
import { MuiBox } from '../../../../../../components/box/muiBox';

interface ModalDeliveryChangesProps {
    isModalDeliveryChangesOpen: boolean,
    setIsModalDeliveryChangesOpen: (value: boolean) => void
}

export const ModalDeliveryChanges = (props: ModalDeliveryChangesProps) => {

    function handleCloseModalDeliveryChanges() {
        props.setIsModalDeliveryChangesOpen(false)
    }

    return (
        <Modal open={props.isModalDeliveryChangesOpen} onClose={handleCloseModalDeliveryChanges}>
            <MuiBox desktopWidth={600} mobileWidthPercent='80%'>
                Modal
            </MuiBox>
        </Modal>
    )
}