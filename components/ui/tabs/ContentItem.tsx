import * as React from 'react';
import { useContext } from 'react';
import { useTabContext } from './Tab';

interface IContentItemProps {
    children: React.ReactNode,
    index: number
}

const ContentItem: React.FunctionComponent<IContentItemProps> = ({children, index}) => {
    const {currentTab} = useTabContext()

    return (
        <>
        {currentTab === index ?
        <div>
            {children}
        </div>
        : null
        }
	    </>
    );
};

export default ContentItem;
