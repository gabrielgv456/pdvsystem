import { BsTrash } from "react-icons/bs";
import { useDarkMode } from "../../../../contexts/DarkMode/DarkModeProvider";
import * as S from "./style"
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from "react";
import { SellersReturnApiProps } from "../index"
import { ModalEditSeller } from "./modals/editSeller";
import { ModalDeleteSeller } from "./modals/deleteSeller";
import { ModalMasterKeyDeleteSeller } from "./modals/masterKey";
import { ModalSuccessDeleteSellerOpen } from "./modals/SuccessDelete";


interface ListSellersProps {
    seller: SellersReturnApiProps;
    isModalTransactionsSellersOpen: boolean;
    setisModalTransactionsSellersOpen: (isModalTransactionsSellersOpen: boolean) => void;
    searchSeller: () => void;
}

export const ListSellers = (props: ListSellersProps) => {

    const Theme = useDarkMode();
    const [isModalEditSellerOpen, setisModalEditSellerOpen] = useState(false);
    const [isModalMasterKeyOpen, setisModalMasterKeyOpen] = useState(false)
    const [isModalDeleteSellerOpen, setisModalDeleteSellerOpen] = useState(false)
    const [isModalSucessOpen, setisModalSucessOpen] = useState(false)
    const cpfFormated = props.seller.cpf.length === 11 ? props.seller.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4") : props.seller.cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5")
    const cellFormated = props.seller.cellNumber !== null && props.seller.cellNumber.replace(/(\d{2})(\d{5})(\d{4})/g, "($1)$2-$3")


    return (
        <>
            <S.Container isDarkMode={Theme.DarkMode} isSellerActive={props.seller.active}>

                <S.ButtonEdit onClick={() => setisModalEditSellerOpen(true)} title="Editar Produto"><HiOutlinePencilAlt size="20" /></S.ButtonEdit>

                <S.LabelNameSeller isDarkMode={Theme.DarkMode}>
                    <b>{props.seller.name}</b>
                </S.LabelNameSeller>


                <S.LabelCpf isDarkMode={Theme.DarkMode}>
                    <b>{cpfFormated}</b>
                </S.LabelCpf>

                <S.LabelPhone isDarkMode={Theme.DarkMode}>
                    <b>{cellFormated}</b>
                </S.LabelPhone>

                <S.LabelEmail isDarkMode={Theme.DarkMode}>
                    <b>{props.seller.email}</b>
                </S.LabelEmail>


                <S.ButtonTrash onClick={() => setisModalMasterKeyOpen(true)} title="Excluir Produto" ><BsTrash size="16" /></S.ButtonTrash>

            </S.Container>

            <ModalMasterKeyDeleteSeller
                setisModalDeleteSellerOpen={setisModalDeleteSellerOpen}
                setisModalMasterKeyOpen={setisModalMasterKeyOpen}
                isModalMasterKeyOpen={isModalMasterKeyOpen}
            />


            <ModalEditSeller
                seller={props.seller}
                isModalEditSellerOpen={isModalEditSellerOpen}
                setisModalEditSellerOpen={setisModalEditSellerOpen}
                setisModalSucessOpen={setisModalSucessOpen}
            />

            <ModalDeleteSeller
                isModalDeleteSellerOpen={isModalDeleteSellerOpen}
                setisModalDeleteSellerOpen={setisModalDeleteSellerOpen}
                setisModalSucessOpen={setisModalSucessOpen}
                idSeller={props.seller.id}
            />
            <ModalSuccessDeleteSellerOpen
                searchSeller={props.searchSeller}
                setisModalSucessOpen={setisModalSucessOpen}
                isModalSucessOpen={isModalSucessOpen}
            />

        </>


    )

}
