import { useState } from 'react';
import AccountHistory from './tables/AccountHistory';
import ERC1155Token from './tables/ERC1155Token';
import ERC20Token from './tables/ERC20Token';
import ERC721Token from './tables/ERC721Token';
import InternalTransactions from './tables/InternalTransactions';
import ProducedBlocks from './tables/ProducedBlocks';
import Tab from "../../components/ui/tabs/Tab"
import TableLoader from '../../components/loaders/TableLoader';


interface ITabProps {
	account: any,
	gasPrice: any
}

const AccountTabs: React.FunctionComponent<ITabProps> = ({account, gasPrice}) => {

  const [currentTabIndex, setCurrentTabIndex] = useState(1)

  const handleChange = (newIndex: number) => {
    setCurrentTabIndex(newIndex)
  }

  return (
    <Tab currentTab={currentTabIndex} onChange={handleChange}>
		<Tab.HeadContainer>
			<Tab.Item label="Transactions" index={1}/>
			<Tab.Item label="Internal Transactions" index={2}/>
			<Tab.Item label="Token Transfers (ERC-20)" index={3}/>
			<Tab.Item label="NFT Transfers (ERC-721)" index={4}/>
			<Tab.Item label="NFT Transfers (ERC-1155)" index={5}/>
			<Tab.Item label="Produced Blocks" index={6}/>
		</Tab.HeadContainer>
		{account ?
		<Tab.ContentContainer>
		<Tab.ContentItem index={1}>
			<AccountHistory account={account} gasPrice={gasPrice}/>
		</Tab.ContentItem>
		<Tab.ContentItem index={2}>
			<InternalTransactions account={account}/> 
		</Tab.ContentItem>
		<Tab.ContentItem index={3}>
			<ERC20Token account={account}/>
		</Tab.ContentItem>
		<Tab.ContentItem index={4}>
			<ERC721Token account={account}/>
		</Tab.ContentItem>
		<Tab.ContentItem index={5}>
			<ERC1155Token account={account}/>
		</Tab.ContentItem>
		<Tab.ContentItem index={6}>
			<ProducedBlocks account={account}/>
		</Tab.ContentItem>
	</Tab.ContentContainer>
	: <TableLoader />}
	</Tab>
  );
};

export default AccountTabs;


  

    
     