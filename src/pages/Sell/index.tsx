import { useContext, useState} from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import * as S from "./style"
import { useDarkMode } from '../../contexts/DarkMode/DarkModeProvider';
import {MdLibraryAdd} from "react-icons/md"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ListSell } from "./ListSell/ListSell";

export const Sell  = () => {

    interface ProductsType {
        name: string;
        id:number;
        value?:number;
        quantity: number;
    };

    const auth = useContext(AuthContext);
    const Theme = useDarkMode();
    const [inputValue, setInputValue] = useState('');
    const Products = [
        {name:'Camisa Lacoste Original',value:'10',quantity:'2'},
        {name:'calça',value:'20',quantity:'3'},
        {name:'short',value:'30',quantity:'4'},
        {name:'blusa',value:'40',quantity:'1'},
    ]
    const options = Products.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
      });
    const [listProducts, setListProducts] = useState<ProductsType[]>([])
    const handleAddProduct = () => {
        let newList = [...listProducts]
        newList.push({
            name:inputValue,
            id: listProducts.length + 1,
            quantity:2,
           
        })
         setListProducts(newList)   
         console.log(listProducts)
       
    }
    function handleRemoveTask (id:number) {
        let filteredtasks= listProducts.filter(list => list.id !== id )
        console.log(filteredtasks)
        
        setListProducts(filteredtasks)
    }
    function handleRemoveItem (id:number,item:number) {
        item = item+1
           
        }
        
    

    return (
        <S.Container isDarkMode={Theme.DarkMode}>
        <S.Header>
            <S.Box>
                <Autocomplete
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    }}
                    id="grouped-demo"
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.name}
                    sx={{border:'#fff', width: '100%', '& input':{color:Theme.DarkMode?'#fff':'', "& .MuiInputLabel-root": {color: 'green'}}}}
                    renderInput={(params) => <TextField {...params} 
                    sx={{borderColor:'#fff'}}
                
                    label="Selecione um produto" 
                    autoFocus/>}
                />
            </S.Box>
            <S.Button onClick={handleAddProduct}>
                <MdLibraryAdd size="25"/>
            </S.Button>
        </S.Header>
        <S.Main>
            <S.DivList>
        {listProducts.map((item)=>(
            <ListSell key={item.name} item={item} handleRemoveTask={handleRemoveTask} handleRemoveItem={handleRemoveItem}/>
               
        ))}</S.DivList>
        <S.Checkout>
            aa
        </S.Checkout>
        </S.Main>
        


        </S.Container>
       
    )
}