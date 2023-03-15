import * as React from 'react';

interface ITabHeadContainerProps {
    children: React.ReactNode
}

const HeadContainer: React.FunctionComponent<ITabHeadContainerProps> = ({children}) => {
  return (
    <div className='flex text-xs font-semibold space-x-2 overflow-x-scroll whitespace-nowrap'>
        {children}
    </div>
  );
};

export default HeadContainer;
