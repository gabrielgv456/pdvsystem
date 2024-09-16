import { BsSearch } from 'react-icons/bs'
import * as S from './style'
import { useDarkMode } from 'src/contexts/DarkMode/DarkModeProvider'
import { MdAdd } from 'react-icons/md'
import { DefaultButton } from 'src/components/buttons/defaultButton'
import { useContext, useEffect, useState } from 'react'
import { useApi } from 'src/hooks/useApi'
import { useMessageBoxContext } from 'src/contexts/MessageBox/MessageBoxContext'
import { AuthContext } from 'src/contexts/Auth/AuthContext'
import { taxGroups } from '@shared/api/fiscal/getTaxGroups'
import { CircularProgressSpinner } from 'src/spinners/progress/CircularProgressSpinner'
import { DefaultTable } from 'src/components/table/table'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { ModalAddEditTaxGroup } from './modals/addEditTaxGroup/modalAddEditTaxGroup'
import { normalizeAndLowercase } from 'src/utils/utils'

export const TabTaxGroups = () => {

    useEffect(() => {
        async function load() {
            try {
                const result = await getTaxGroups(idUser)
                if (!result.Success) throw new Error(result.erro ?? 'Erro Desconhecido')
                setTaxGroups(result.taxGroups)
            } catch (error) {
                MessageBox('error', 'Ocorreu uma falaha ao localizar os grupos de tributação! ' + (error as Error).message)
            } finally {
                setIsLoading(false)
            }
        }
        load()
    }, [])

    const { idUser } = useContext(AuthContext)
    const { DarkMode } = useDarkMode()
    const { getTaxGroups } = useApi()
    const { MessageBox } = useMessageBoxContext()
    const [isLoading, setIsLoading] = useState(true)
    const [taxGroups, setTaxGroups] = useState<taxGroups[] | null>(null)
    const [isModalEditTaxGroupOpen, setIsModalEditTaxGroupOpen] = useState(false)
    const [isModalAddTaxGroupOpen, setIsModalAddTaxGroupOpen] = useState(false)
    const [inputSearchTaxGroup, setInputSearchTaxGroup] = useState('')
    const filteredTaxGroups = taxGroups?.filter(item => normalizeAndLowercase(item.description).includes(normalizeAndLowercase(inputSearchTaxGroup)))

    return (
        <>
            <S.Header>
                <S.DivSearch>
                    <BsSearch style={{ margin: '15px', color: "#9eaab5" }} size="18" />
                    <S.InputSearch
                        value={inputSearchTaxGroup}
                        onChange={(e) => setInputSearchTaxGroup(e.target.value)}
                        isDarkMode={DarkMode}
                        placeholder="Localizar Grupo de Tributação..."></S.InputSearch>
                </S.DivSearch>
                <label>
                    <DefaultButton selectedColor='--Blue' onClick={() => setIsModalAddTaxGroupOpen(true)}>
                        <MdAdd size="22" />
                        NOVO GRUPO
                    </DefaultButton>
                </label>
            </S.Header>

            {isLoading ? <CircularProgressSpinner /> :
                (filteredTaxGroups &&
                    <DefaultTable headers={['', 'Descrição']}

                        rows={filteredTaxGroups.map(item => {
                            return {
                                active: true,
                                alignment: 'center',
                                columns: [
                                    { component: <S.ButtonEdit onClick={() => { setIsModalEditTaxGroupOpen(true) }} title="Editar Grupo de Tributação"><HiOutlinePencilAlt size="1.2rem" /></S.ButtonEdit> },
                                    { component: item.description }
                                ]
                            }
                        })}

                    />)
            }

            <ModalAddEditTaxGroup
                type='Add'
                isModalOpen={isModalAddTaxGroupOpen}
                setIsModalOpen={setIsModalAddTaxGroupOpen}
            />
            <ModalAddEditTaxGroup
                type='Edit'
                isModalOpen={isModalEditTaxGroupOpen}
                setIsModalOpen={setIsModalEditTaxGroupOpen}
            />
        </>
    )
}