import { TextInput } from 'flowbite-react';
import { LiaPlusSolid } from "react-icons/lia";
import { HiSearch } from "react-icons/hi";
import { useContext } from 'react';
import { StoreContext } from '@/store/StoreProvider';

const SearchComponent = () => {
    const { setInputValue, inputValue, setOpen } = useContext(StoreContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className='flex gap-4 max-md:w-full'>
            <TextInput
                id="search"
                type="text" icon={HiSearch}
                value={inputValue}
                onChange={handleChange}
                placeholder="Buscar" required
                className='w-full lg:w-[30rem]' />
            <button className='w-44 h-10 rounded-lg flex place-items-center justify-center text-white bg-[#DC5F00] hover:bg-[#80523b] transition-all font-medium max-md:text-xs'
                onClick={() => setOpen(true)}>
                <LiaPlusSolid size={20} />
                <p className='hidden md:block text-sm'>Crear contacto</p>
            </button>


        </div>
    )
}

export default SearchComponent