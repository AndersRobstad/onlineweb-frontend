import React, { FC } from 'react';

import ResponsiveImage from 'common/components/ResponsiveImage';
import IImage from 'common/models/Image';

import style from './articleView.less';

export interface IProps {
  image: IImage;
}

export const ArticleImage: FC<IProps> = ({ image }) => (
  <section className={style.articleimage}>
    <ResponsiveImage image={image} size="original" />
    {image.photographer ? (
      <div>
        <span>Fotograf</span> {image.photographer}
      </div>
    ) : null}
  </section>
);
