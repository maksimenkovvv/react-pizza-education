import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={468}
    viewBox="0 0 280 468"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="120" r="120" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="307" rx="10" ry="10" width="280" height="40" />
    <rect x="0" y="348" rx="10" ry="10" width="280" height="40" />
    <rect x="0" y="405" rx="10" ry="10" width="135" height="45" />
    <rect x="145" y="405" rx="10" ry="10" width="135" height="45" />
  </ContentLoader>
);

export default Skeleton;
