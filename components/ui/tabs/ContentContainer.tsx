import * as React from 'react';

interface IContentContainerProps {
    children: React.ReactNode
}

const ContentContainer: React.FunctionComponent<IContentContainerProps> = ({children}) => {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="md:px-4 py-5 flex-auto">
            {children}
        </div>
    </div>
  );
};

export default ContentContainer;
