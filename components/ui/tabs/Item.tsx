import * as React from 'react';
import { useTabContext } from './Tab';
import cx from "classnames"

interface ITabItemProps {
    label: string,
    index: number
}

const Item: React.FunctionComponent<ITabItemProps> = ({label, index}) => {

    const {currentTab, onChange} = useTabContext()

    const handleClick = () => {
        onChange(index)
    }
    
    return (
        <p onClick={handleClick} className={cx('py-2 px-3 rounded-lg flex cursor-pointer', currentTab === index ? 'bg-[#0784c3] text-white' : 'bg-gray-200')}>
            {label}
        </p>
    )
};

export default Item;

