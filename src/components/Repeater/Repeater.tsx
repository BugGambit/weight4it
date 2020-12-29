import React from 'react';

interface RepeaterProps {
  times: number;
  children: JSX.Element;
}

function Repeater({ times, children }: RepeaterProps) {
  return (
    <>
      {[...Array(times)].map((_, index) =>
        // eslint-disable-next-line react/no-array-index-key
        React.cloneElement(children, { key: index })
      )}
    </>
  );
}
Repeater.defaultProps = {} as Partial<RepeaterProps>;

export default Repeater;
