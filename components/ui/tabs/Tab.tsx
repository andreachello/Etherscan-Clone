import * as React from 'react';
import { createContext, useContext } from 'react';
import ContentContainer from "./ContentContainer"
import ContentItem from "./ContentItem"
import HeadContainer from "./HeadContainer"
import Item from "./Item"


interface ITabProps  {
    children?: React.ReactNode,
    currentTab: number,
    onChange: (i:number) => void,
    HeadContainer?: typeof HeadContainer,
    Item?: typeof Item,
    ContentContainer?: typeof ContentContainer,
    ContentItem?: typeof ContentItem
}

export const TabContext = createContext({
    currentTab: 1,
    onChange: (i: number) => {},
})

const Tab = ({children, currentTab, onChange, ...props}: ITabProps) => {
  return (
    <TabContext.Provider value={{currentTab, onChange, ...props}}>
        <div className='py-6 mx-5 md:mx-16 2xl:mx-72 flex flex-col space-y-3'>
            {children}
        </div>
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext)
  if (context === undefined) throw new Error("useTabContext must be within an TabProvider")
  return context
}

Tab.HeadContainer = HeadContainer;
Tab.ContentContainer = ContentContainer
Tab.ContentItem = ContentItem
Tab.Item = Item

export default Tab;