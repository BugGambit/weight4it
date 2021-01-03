import LinkWithoutStyle from 'components/LinkWithoutStyle/LinkWithoutStyle';
import Sidebar from 'components/Sidebar/Sidebar';
import Title from 'components/Title/Title';
import React from 'react';

interface PageWrapperProps {
  children: JSX.Element;
}

function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <LinkWithoutStyle to="/">
        <Title />
      </LinkWithoutStyle>
      <Sidebar />
      {children}
    </>
  );
}

export default PageWrapper;
