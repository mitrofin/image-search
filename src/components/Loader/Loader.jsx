/* import { Component } from 'react'; */
import { useState } from 'react';
import { css } from '@emotion/react';
import DotLoader from 'react-spinners/DotLoader';

const override = css`
  display: block;
  margin: 2px auto;
`;

export default function Loaders() {
  let [loading] = useState(true);
  let [color] = useState('#3f51b5');

  return (
    <div className="sweet-loading">
      <DotLoader color={color} loading={loading} css={override} size={60} />
    </div>
    /*       <div className={styles.containerLoader}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={1000} //3 secs
        />
      </div> */
  );
}
