import { Children, Fragment } from 'react';

import { IconSvgLocal } from '../icon-vec-local';

const Breadcrumbs = ({ children }: any) => {
  const childrenArray = Children.toArray(children);
  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span className="text-color-700">
            <IconSvgLocal height={20} name="IC_ARROW_RIGHT" fill="rgb(var(--pending-600)" />
          </span>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <nav>
      <ol className="flex items-center space-x-8">{childrenWtihSeperator}</ol>
    </nav>
  );
};

export default Breadcrumbs;
