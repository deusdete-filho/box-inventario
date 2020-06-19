import React from 'react';
import { Container, Content, Title, Img } from './styles';
import suporte from '../../assets/suporte.png';
import equipamento from '../../assets/equipamento.png';
const items = [
  {
    key: String(Math.random()),
    title: 'Solicite um suporte remoto',
    bgColor: '#172c4a',
    img: suporte,
  },
  {
    key: String(Math.random()),
    title: 'Meus equipamentos',
    bgColor: '#6a0159',
    img: equipamento,
  },
  {
    key: String(Math.random()),
    title: 'Meu histórico de atendimento',
    bgColor: '#4139c8',
    img: suporte,
  },
  {
    key: String(Math.random()),
    title: 'Solicite um suporte remoto',
    bgColor: '#ba2f76',
    img: equipamento,
  },
];
const SelectDevice: React.FC = () => (
  <Container>
    {items.map((item) => (
      <Content key={item.key} bgColor={item.bgColor}>
        <Title>{item.title}</Title>
        <Img source={item.img} />
      </Content>
    ))}
  </Container>
);

export default SelectDevice;
