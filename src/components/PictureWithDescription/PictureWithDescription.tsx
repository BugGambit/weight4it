import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  size: string;
}

const Container = styled.div.attrs<ContainerProps, ContainerProps>((props) => ({
  size: props.size,
}))`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: ${(props) => props.theme.foregroundColor};
    font-size: 23px;
    margin: 0 0 5px 0;
  }

  > img {
    object-fit: cover;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    border: 1px solid black;
  }
`;

interface PictureWithDescriptionProps {
  imgSrc: string;
  imgAlt: string;
  description: string;
  size?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function PictureWithDescription({
  imgSrc,
  imgAlt,
  description,
  size,
  onClick,
}: PictureWithDescriptionProps) {
  return (
    <Container size={size} onClick={onClick}>
      <p>{description}</p>
      <img src={imgSrc} alt={imgAlt} />
    </Container>
  );
}
PictureWithDescription.defaultProps = {
  size: '100px',
} as Partial<PictureWithDescriptionProps>;

export default PictureWithDescription;
